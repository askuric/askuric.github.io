// -------------------------------
// Utilities
// -------------------------------
function normalizeTitle(t) {
  return (t || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim();
}

function getYearSafe(y, fallback) {
  if (y && Number.isFinite(+y)) return +y;
  return fallback || new Date().getFullYear();
}

function makeKey(item) {
  if (item.doi)   return "doi:"    + item.doi.toLowerCase();
  if (item.arxiv) return "arxiv:"  + item.arxiv.toLowerCase();
  if (item.halId) return "hal:"    + item.halId.toLowerCase();
  return "t|" + normalizeTitle(item.title) + "|" + (item.year || "");
}

function boldAntun(nameList) {
  return (nameList || "").replace("Antun Skuric", "<b>Antun Skuric</b>");
}

function truncateAuthors(authorsArr) {
  if (!Array.isArray(authorsArr)) return "";
  const short = authorsArr.length < 5 ? authorsArr : [...authorsArr.slice(0,4), "et al."];
  return short.join(", ");
}

// -------------------------------
// Render
// -------------------------------
function renderPapers(papers, id_div, id_num) {
  if (!papers || papers.length === 0) return;

  // show section
  $('#'+id_div).parent().css("display","block");

  // sort by year desc
  papers.sort((a,b) => (b.year||0) - (a.year||0));

  // count
  $('#'+id_num).html(papers.length);

  let html = $('#'+id_div).html();
  let currentYear = null;

  papers.forEach(p => {
    if (p.year !== currentYear) {
      currentYear = p.year;
      html += `<h5 style="text-align:left;margin-top:10px;margin-bottom:10px">${currentYear||""}</h5>`;
    }

    const authorsLine = boldAntun(truncateAuthors(p.authors || []));
    const venue = p.venue || "";

    const links = []
    if (p.halId)   links.push(` <a target="_blank" href="https://inria.hal.science/${p.halId}">(${p.halId})</a>`);
    if (p.arxiv)   links.push(` <a target="_blank" href="https://arxiv.org/abs/${p.arxiv}">(arXiv:${p.arxiv})</a>`);
    if (p.doi)     links.push(` <a target="_blank" href="https://doi.org/${p.doi}">(doi)</a>`);
    if (p.pdf)     links.push(` <a target="_blank" href="${p.pdf}"><i class="fa fa-file-pdf"></i> PDF</a>`);

    html += `
      <p style="margin-top:10px;margin-bottom:10px">
        <b>${p.title || ""}</b><br>
        by ${authorsLine}
        <em><br>${venue}</em>
        ${links.join("")}
      </p>`;
  });

  $('#'+id_div).html(html);
}

// -------------------------------
// Fetchers (HAL + arXiv) -> unified schema
// -------------------------------
function fetchHAL(halUrl) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: halUrl,
      dataType: "json",
      complete: function(resp) {
        try {
          const data = typeof resp.responseJSON === "object" ? resp.responseJSON
                     : JSON.parse(resp.responseText || "{}");
          const docs = (data && data.response && data.response.docs) || [];
          const unified = docs.map(d => {
            const title = Array.isArray(d.title_s) ? d.title_s[0] : (d.title_s || "");
            const authors = Array.isArray(d.authFullName_s) ? d.authFullName_s : [];
            const year = getYearSafe(d.publicationDateY_i || d.producedDateY_i, null);
            const venue = d.journalTitle_s || d.conferenceTitle_s || "";
            let pdf = null;
            if (Array.isArray(d.files_s)) pdf = d.files_s[0];
            else if (typeof d.files_s === "string") pdf = d.files_s;

            let arxiv = null;
            if (Array.isArray(d.arxivId_s)) arxiv = d.arxivId_s[0];
            else if (typeof d.arxivId_s === "string") arxiv = d.arxivId_s;

            let doi = null;
            if (Array.isArray(d.doiId_s)) doi = d.doiId_s[0];
            else if (typeof d.doiId_s === "string") doi = d.doiId_s;

            return {
              source: "HAL",
              title: title,
              authors: authors,
              year: year,
              venue: venue,
              halId: d.halId_s || null,
              arxiv: arxiv ? String(arxiv).replace(/^arXiv:/i,"") : null,
              doi: doi || null,
              pdf: pdf || null
            };
          });
          resolve(unified);
        } catch (e) {
          reject(e);
        }
      },
      error: reject
    });
  });
}

// Parse arXiv Atom XML
function fetchArXivByAuthor(authorQuery, maxResults = 200) {
  // authorQuery example: 'Antun Skuric' -> will be quoted and plus-joined
  // arXiv API: export.arxiv.org/api/query?search_query=au:"First+Last"
  const q = encodeURIComponent(`au:"${authorQuery}"`);
  const url = `https://export.arxiv.org/api/query?search_query=${q}&max_results=${maxResults}`;
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      dataType: "xml",
      success: function(xml) {
        try {
          const entries = $(xml).find("entry");
          const results = [];
          entries.each(function() {
            const $e = $(this);
            const title = $e.find("title").first().text().trim();
            const authors = $e.find("author > name").map(function(){return $(this).text().trim();}).get();
            const published = $e.find("published").first().text().trim();
            const year = getYearSafe(published ? new Date(published).getFullYear() : null, null);

            // arXiv ID lives in <id> like ".../abs/YYMM.NNNNN"
            let arxivId = null;
            const idUrl = $e.find("id").first().text().trim();
            const m = idUrl.match(/arxiv\.org\/abs\/([^\/\s]+)/i);
            if (m) arxivId = m[1];

            // links
            let pdf = null;
            $e.find("link").each(function() {
              const rel = $(this).attr("rel");
              const href = $(this).attr("href");
              if (rel === "related" && href && href.endsWith(".pdf")) pdf = href;
              if (!rel && href && href.endsWith(".pdf")) pdf = href;
            });

            // journal_ref if present -> venue
            const venue = $e.find("arxiv\\:journal_ref, journal_ref").first().text().trim() || "";

            // doi if present
            let doi = $e.find("arxiv\\:doi, doi").first().text().trim() || null;

            results.push({
              source: "arXiv",
              title,
              authors,
              year,
              venue,
              halId: null,
              arxiv: arxivId,
              doi,
              pdf
            });
          });
          resolve(results);
        } catch (e) {
          reject(e);
        }
      },
      error: reject
    });
  });
}

// -------------------------------
// Merge + dedupe + render for one section
// -------------------------------
async function load_hal_and_arxiv(halUrl, arxivAuthorName, id_div, id_num) {
  try {
    const [halList, arxivList] = await Promise.all([
      fetchHAL(halUrl),
      fetchArXivByAuthor(arxivAuthorName)
    ]);

    // De-duplicate: prefer HAL metadata when a collision occurs (swap order to prefer arXiv)
    const seen = new Set();
    const merged = [];

    function add(item) {
      const keyPrimary = makeKey(item);
      if (!seen.has(keyPrimary)) {
        seen.add(keyPrimary);
        merged.push(item);
      } else {
        // merge missing fields if needed (keeps first-added fields)
        const idx = merged.findIndex(x => makeKey(x) === keyPrimary);
        if (idx >= 0) {
          const dst = merged[idx];
          merged[idx] = {
            ...dst,
            // keep existing dst fields, fill gaps from item
            title: dst.title || item.title,
            authors: (dst.authors && dst.authors.length ? dst.authors : item.authors),
            year: dst.year || item.year,
            venue: dst.venue || item.venue,
            halId: dst.halId || item.halId,
            arxiv: dst.arxiv || item.arxiv,
            doi: dst.doi || item.doi,
            pdf: dst.pdf || item.pdf
          };
        }
      }
    }

    // Add HAL first so it "wins" on collisions; flip if you want arXiv to win
    halList.forEach(add);
    arxivList.forEach(add);

    renderPapers(merged, id_div, id_num);
  } catch (e) {
    // fail soft: fall back to HAL only (keeps your site functional)
    console.error("HAL+arXiv merge error:", e);
    try {
      const halOnly = await fetchHAL(halUrl);
      renderPapers(halOnly, id_div, id_num);
    } catch (e2) {
      console.error("HAL fallback failed:", e2);
    }
  }
}

// -------------------------------
// Your section calls
// -------------------------------
const query = "authIdHal_s:antun-skuric";
const authorArXiv = "Antun Skuric";
const year = new Date().getFullYear();

function halBase(q) {
  return `https://api.archives-ouvertes.fr/search/?q=${q}&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort asc`;
}

// Journals
load_hal_and_arxiv(
  halBase(`${query} AND docType_s:ART AND (producedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`),
  authorArXiv,
  'journal_papers',
  'journal_num'
);

// Conferences
load_hal_and_arxiv(
  halBase(`${query} AND docType_s:COMM AND ((proceedings_s:0 AND conferenceStartDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) OR (proceedings_s:1 AND ((NOT publicationDate_tdate:* AND conferenceStartDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) OR (publicationDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z])))) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`),
  authorArXiv,
  'conference_papers',
  'conference_num'
);

// Preprints (HAL UNDEFINED) + arXiv
load_hal_and_arxiv(
  halBase(`${query} AND docType_s:"UNDEFINED" AND (producedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`),
  authorArXiv,
  'preprint_papers',
  'preprint_num'
);

// Reports
load_hal_and_arxiv(
  halBase(`${query} AND docType_s:REPORT AND (producedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`),
  authorArXiv,
  'report_papers',
  'report_num'
);

// Theses
load_hal_and_arxiv(
  halBase(`${query} AND docType_s:THESE AND (producedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`),
  authorArXiv,
  'thesis_papers',
  'thesis_num'
);

// Book sections
load_hal_and_arxiv(
  halBase(`${query} AND (docType_s:"OUV" OR docType_s:"COUV" OR docType_s:"DOUV") AND NOT popularLevel_s:1 AND audience_s:2 AND (producedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`),
  authorArXiv,
  'book_papers',
  'book_num'
);

// Patents
load_hal_and_arxiv(
  halBase(`${query} AND docType_s:PATENT AND (producedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`),
  authorArXiv,
  'patent_papers',
  'patent_num'
);
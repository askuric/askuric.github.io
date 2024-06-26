
// funciton using the hal api to update the placeholders in the site
function load_data_from_hall(url, id_div, id_num){
    $.ajax({
        url: url,
        dataType: "application/json",
        complete: function(data){
            data = JSON.parse(data.responseText);
            data
            if(data.response.docs.length==0) {
                return;
            }else{
                $('#'+id_div).parent().css("display","block")
            }
            papers = data.response.docs
            //console.log(papers)
            papers.sort(function(b,a){
                return a.publicationDateY_i - b.publicationDateY_i 
            })
            year = 0
            $('#'+id_num).html(papers.length)

            
            papers.forEach(function(paper){
                if(paper.publicationDateY_i != year){
                    year = paper.publicationDateY_i
                    $('#'+id_div).html( $('#'+id_div).html() + "<h5 style='text-align:left;margin-top:10px;margin-bottom:10px'>"+year+"</h5>")
                }
                authors = ((paper.authFullName_s.length < 5) ? paper.authFullName_s.join(", ") : paper.authFullName_s.slice(0, 4).join(", ") + ' et al.')
                // make the author Antun Skuric bold
                authors = authors.replace("Antun Skuric", "<b>Antun Skuric</b>")

                $('#'+id_div).html( $('#'+id_div).html() +
                '<p style="margin-top:10px;margin-bottom:10px"><b>'+paper.title_s[0] +'</b><br>by '+ 
                authors+' <em><br>'+
                 ((paper.journalTitle_s) ? paper.journalTitle_s  : ((paper.conferenceTitle_s) ? paper.conferenceTitle_s : '') ) + "</em>"+
                 (' <a target="_blank" href="https://inria.hal.science/'+paper.halId_s+'">('+paper.halId_s+')</a>')+
                 ((paper.files_s) ? ' <a target="_blank" href="'+paper.files_s+'"> <i class="fa fa-file-pdf"></i> PDF</a>' : ''))
            })
        },
        success: function(data){
        }
    })
}

querry = "authIdHal_s:antun-skuric"
// current year
year = new Date().getFullYear()
// journal papers
load_data_from_hall(
'https://api.archives-ouvertes.fr/search/?q='+querry+' AND docType_s:ART AND (producedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort asc',
'journal_papers',
'journal_num'
)

// conference papers
load_data_from_hall(
'https://api.archives-ouvertes.fr/search/?q='+querry+' AND docType_s:COMM AND ((proceedings_s:0 AND conferenceStartDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]) OR (proceedings_s:1 AND ((NOT publicationDate_tdate:* AND conferenceStartDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]) OR (publicationDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z])))) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort asc',
'conference_papers',                                 
'conference_num'
)

// preprints
load_data_from_hall(
'https://api.archives-ouvertes.fr/search/?q='+querry+' AND docType_s:"UNDEFINED" AND (producedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort asc',
'preprint_papers',
'preprint_num'
)


// Thesis
load_data_from_hall(
'https://api.archives-ouvertes.fr/search/?q='+querry+' AND docType_s:REPORT AND (producedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort asc',
'report_papers',
'report_num'
)

// Thesis
load_data_from_hall(
'https://api.archives-ouvertes.fr/search/?q='+querry+' AND docType_s:THESE AND (producedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort asc',
'thesis_papers',
'thesis_num'
)

// book sections
load_data_from_hall(
'https://api.archives-ouvertes.fr/search/?q='+querry+'%20AND%20(docType_s:%22OUV%22%20OR%20docType_s:%22COUV%22%20OR%20docType_s:%22DOUV%22)%20AND%20NOT%20popularLevel_s:1%20AND%20audience_s:2%20AND%20(producedDate_tdate:[1900-01-01T00:00:00Z%20TO%20'+year+'-12-31T00:00:00Z]%20OR%20publicationDate_tdate:[1900-01-01T00:00:00Z%20TO%20'+year+'-12-31T00:00:00Z])%20AND%20submittedDate_tdate:[1900-01-01T00:00:00Z%20TO%20'+year+'-12-31T00:00:00Z]&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort%20asc',
'book_papers',
'book_num'
)

// Thesis
load_data_from_hall(
'https://api.archives-ouvertes.fr/search/?q='+querry+' AND docType_s:PATENT AND (producedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z] OR publicationDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]) AND submittedDate_tdate:[1900-01-01T00:00:00Z TO '+year+'-12-31T00:00:00Z]&rows=999&fl=abstract_s,anrProjectReference_s,arxivId_s,audience_s,authAlphaLastNameFirstNameId_fs,authFirstName_s,authFullName_s,authIdHalFullName_fs,authLastName_s,authMiddleName_s,authorityInstitution_s,bookCollection_s,bookTitle_s,city_s,collCode_s,comment_s,conferenceEndDateD_i,conferenceEndDateM_i,conferenceEndDateY_i,conferenceStartDate_s,conferenceStartDateD_i,conferenceStartDateM_i,conferenceStartDateY_i,conferenceTitle_s,country_s,defenseDateY_i,description_s,director_s,docid,docType_s,doiId_s,europeanProjectCallId_s,files_s,halId_s,invitedCommunication_s,isbn_s,issue_s,journalIssn_s,journalTitle_s,label_bibtex,label_s,language_s,localReference_s,nntId_id,nntId_s,number_s,page_s,peerReviewing_s,popularLevel_s,proceedings_s,producedDateY_i,publicationDateY_i,publicationLocation_s,publisher_s,publisherLink_s,pubmedId_s,related_s,reportType_s,scientificEditor_s,seeAlso_s,serie_s,source_s,*_subTitle_s,subTitle_s,swhId_s,*_title_s,title_s,version_i,volume_s,authQuality_s,authIdHasPrimaryStructure_fs,inPress_bool,submitType_s,linkExtId_s,wosId_s,linkExtUrl_s,files_s&sort=auth_sort asc',
'patent_papers',
'patent_num'
)
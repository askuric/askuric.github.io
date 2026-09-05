---
title: "The Sustainability Gap in Robotics: A Large-Scale Survey of Sustainability Awareness in 50,000 Research Articles"
collection: publications
permalink: /sustainability_review
teaser: "teaser_sustainability.png"
date: 2026-04-20
venue: 'Submitter to: Springer Discover Sustainability Journal'
paperurl: 'https://arxiv.org/abs/2604.07921'
citation: ''
authors: '<b>Antun Skuric</b>, Leandro Von Wera, Thomas Wolf'
---

<div style="display:inline-flex;width:80%;justify-content:space-between">
    <a href="https://github.com/huggingface/arxiv-robotics-sustainability-classification"> <i class="fab fa-github"></i> Codebase</a>  
    <a href="https://huggingface.co/datasets/sustainable-robotics/robotics-arxiv-sustainability-classification"><i class="fa fa-database"></i> Dataset</a>   
    <a href="https://huggingface.co/spaces/sustainable-robotics/paper-sustainability-assessment"><i class="fa fa-laptop-code"></i> Interactive Demo</a>   
    <a href="https://huggingface.co/spaces/sustainable-robotics/sustainability-in-robotics"><i class="fa fa-newspaper"></i> Blog Post</a>
    <a href="https://arxiv.org/abs/2604.07921"><i class="fa fa-file-pdf"></i> PDF</a>
</div>
<img style="max-width:100%;max-height:300px" src="images/sustainability_review.png" >

## Abstract 
We present a large-scale survey of sustainability communication and 
motivation in robotics research. Our analysis covers nearly 50,000 
open-access papers from arXiv's cs.RO category published between 2015 
and early 2026. In this study, we quantify how often papers mention social,
ecological, and sustainability impacts, and we analyse their alignment 
with the UN Sustainable Development Goals (SDGs). 

The results reveal a  persistent gap between the field's potential 
and its stated intent. While a large fraction of robotics papers can be 
mapped to SDG-relevant
domains, explicit sustainability motivation remains remarkably low. 
Specifically, mentions of sustainability-related impacts are typically 
below 2%, explicit SDG references stay below 0.1%, and the proportion
of sustainability-motivated papers remains below 5%. These trends 
suggest that while the field of robotics is advancing rapidly, 
sustainability is not yet a standard part of research framing. 

We conclude by proposing concrete actions for researchers, conferences, 
and institutions to close these awareness and motivation gaps, 
supporting a shift toward more intentional and responsible innovation.

## Key Findings

Our large-scale study highlights three dominant trends:

* **Exponential Growth:** The field of robotics is growing at an exponential rate.
* **The Awareness Gap:** Explicit communication regarding broader impacts (social, sustainability, and ecological) is marginal, with the proportion of such mentions remaining stagnant over the last decade.
* **The Motivation Gap:** While a vast majority of robotics research addresses topics that have the potential for improving sustainability, only a small fraction of authors is explicitly motivated by it.

## Open Source Resources & Data

To enable easier reproduction and full transparency, the complete analysis pipeline has been open-sourced, enabling researchers to independently evaluate their own manuscripts.

* **Interactive Demo:** The interactive Paper Analysis Tool is available on Hugging Face.
* **Codebase:** The underlying codebase is publicly accessible on GitHub at `huggingface/arxiv-robotics-sustainability-classification`.
* **Dataset:** The complete dataset comprising the about 50,000 analyzed arXiv articles, including the LLM's classifications and reasoning outputs, has been released on Hugging Face Datasets at `sustainable-robotics/robotics-arxiv-sustainability-classification`.
* **Blog Post:** Read the full breakdown and discussion on our Hugging Face space: [Robotics research should think more about sustainability!](https://huggingface.co/spaces/sustainable-robotics/sustainability-in-robotics).
"""Rebuild the English CV, retaining the original three-page visual structure.

Requires reportlab. Set CV_FONT_DIR to a directory containing Carlito TTF fonts.
"""
import os
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parent
FONT_DIR = Path(os.environ.get('CV_FONT_DIR', '/home/nicolas/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/share/fonts/truetype'))
for name, suffix in [('Body', 'Regular'), ('Bold', 'Bold'), ('Italic', 'Italic')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / f'Carlito-{suffix}.ttf')))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Italic', boldItalic='Bold')
W, H = 595.5, 842.25
BLUE, GRAY = '#0750B0', '#505050'
c = canvas.Canvas(str(ROOT / 'CV.pdf'), pagesize=(W,H))
c.setTitle('Nicolas Schneider | Salesforce, Data & AI Consultant')
c.setAuthor('Nicolas Schneider')

def para(text, x, top, width, size=10.5, leading=None, font='Body', color=GRAY):
    style = ParagraphStyle('cv', fontName=font, fontSize=size, leading=leading or size*1.27, textColor=HexColor(color))
    p = Paragraph(text, style)
    _, height = p.wrap(width, H)
    assert top + height < 802, (text, top, height)
    p.drawOn(c,x,H-top-height)
    return top+height

def heading(text,x,top):
    return para(text,x,top,460,15,18,'Bold',BLUE)

def polygon(points):
    c.setFillColor(HexColor(BLUE))
    p=c.beginPath(); p.moveTo(*points[0])
    for point in points[1:]: p.lineTo(*point)
    p.close(); c.drawPath(p,fill=1,stroke=0)

def base(first=False,title=''):
    c.setFillColor(HexColor('#FFFFFF')); c.rect(0,0,W,H,fill=1,stroke=0)
    if first:
        polygon([(0,H),(W,H),(W,H-37),(0,H-118)])
    else:
        polygon([(0,H),(205,H),(0,H-28)])
        polygon([(W-235,0),(W,33),(W,0)])
        c.setFillColor(HexColor('#000000')); c.setFont('Bold',29)
        c.drawCentredString(W/2,H-108,title)
        c.setFont('Body',9); c.setFillColor(HexColor(GRAY))
        c.drawCentredString(W/2,56,'+49 174 281 5369   |   Am Flugplatz 8, 33659 Bielefeld   |   schneidernicolas90@gmail.com')

def timeline(entries,x,top,width,size=10.6,gap=12):
    dots=[]
    for date,title,description in entries:
        dots.append(top+5)
        top=para(date,x+23,top,width-23,size)
        top=para(title,x+23,top+2,width-23,size,font='Bold')
        if description:
            top=para(description,x+23,top+4,width-23,size)
        top+=gap
    c.setStrokeColor(HexColor(BLUE));c.setLineWidth(1)
    c.line(x,H-dots[0],x,H-dots[-1])
    c.setFillColor(HexColor('#000000'))
    for y in dots:c.circle(x,H-y,2.5,fill=1,stroke=0)
    return top

base(first=True)
c.drawImage(str(ROOT/'assets/portrait.jpg'),68,H-206,width=90,height=136)
para('Salesforce, Data &amp; AI Consultant',255,108,325,18,22,'Italic')
para('NICOLAS<br/>SCHNEIDER',255,140,315,37,33,'Bold',BLUE)
heading('PROFILE',72,259)
para('Consultant with a background in Applied Mathematics, building CRM, data and AI solutions. My work spans Salesforce Consumer Goods Cloud, Azure integration and Microsoft Fabric analytics. I develop business workflows and APIs, connect reliable data pipelines, and build AI document-processing applications with human review. I also set up local inference environments and evaluate model quality, performance and fine-tuning results.',72,284,221,10.1,13)
heading('CONTACT',72,421)
para('<b>Mobile:</b> +49 174 281 5369<br/><b>Address:</b> Am Flugplatz 8, 33659 Bielefeld<br/><b>Email:</b> schneidernicolas90@gmail.com<br/><b>Website:</b> <link href="https://nicolas2912.github.io" color="#0750B0">nicolas2912.github.io</link><br/><b>LinkedIn:</b> <link href="https://www.linkedin.com/in/nicolas-schneider1/" color="#0750B0">in/nicolas-schneider1</link><br/><b>GitHub:</b> <link href="https://github.com/Nicolas2912" color="#0750B0">github.com/Nicolas2912</link>',72,445,236,10.3,14)
heading('SKILLS',72,555)
skills=[
    'Salesforce: Apex, SOQL, LWC, Flows',
    'Azure Data Factory, Azure SQL / T-SQL',
    'Microsoft Fabric, Delta Lake, ETL / ELT',
    'Python, TypeScript / JavaScript, C# / .NET',
    'Node.js, REST APIs, PostgreSQL',
    'AI extraction, JSON Schema, model evaluation',
    'vLLM, LiteLLM, QLoRA / Unsloth',
    'Docker, Git, Azure DevOps, Terraform',
    'Container Apps, Service Bus, Blob Storage',
]
for i,skill in enumerate(skills):para('• '+skill,77,581+i*15,234,10.1,13)
heading('LANGUAGES',72,728)
para('German: Native language<br/>English: Business fluent',72,753,224,10.5,15)
heading('PROFESSIONAL CAREER',328,259)
timeline([
    ('07.2025 - Present','4brands Reply','Consultant'),
    ('11.2024 - 05.2025','Fraunhofer IPT',"Master's thesis student"),
    ('10.2024 - 06.2025','4brands Reply','Working Student / Data Analyst'),
    ('02.2023 - 08.2024','Diamant Software','Working Student / Data Scientist'),
    ('11.2022 - 02.2023','Diamant Software',"Bachelor's thesis student"),
    ('08.2022 - 10.2022','Diamant Software','Intern'),
],331,295,213,10.4,10)
heading('EDUCATION',328,638)
timeline([
    ('03.2023 - 06.2025','HSBI Bielefeld',"M.Sc. Optimization and Simulation<br/>Grade: 2.0 (German scale)"),
    ('09.2019 - 02.2023','FH Bielefeld','Bachelor of Applied Mathematics'),
],335,667,211,10.3,8)
c.showPage()

base(title='PROFESSIONAL CAREER')
heading('WORKING EXPERIENCE',77,175)
timeline([
    ('07.2025 - Present','Consultant at 4brands Reply',
     'Develop Salesforce Consumer Goods Cloud solutions using Apex, Lightning Web Components and Flows, including PDF generation, contact synchronization and data maintenance. Build Azure Data Factory and SQL pipelines for scoring, export and reconciliation, plus Fabric transformations for sales-target reporting.<br/><br/>'
     'Implement AI menu and receipt extraction applications with Salesforce review interfaces, TypeScript APIs and workers, PostgreSQL, Azure Blob Storage and Service Bus. Add schema validation, retries and idempotent processing; package delivery with Docker, Azure DevOps and Terraform.<br/><br/>'
     'Set up local vLLM / LiteLLM inference and monitoring. Benchmark answer quality, tool calling, document parsing, latency and throughput; run QLoRA experiments and compare them with the base model. Develop a .NET benchmark worker to compare Salesforce-to-SQL synchronization with ADF.'),
    ('11.2024 - 05.2025',"Master's thesis student at Fraunhofer IPT",
     'Developed a decision framework for selecting multimodal data-integration approaches based on technical documentation for LLM-driven maintenance support.'),
    ('10.2024 - 06.2025','Working Student / Data Analyst at 4brands Reply',
     'Processed and analyzed Salesforce data using Microsoft Azure and SQL. Developed data-preparation workflows and supported cloud-based reporting and integration.'),
    ('02.2023 - 08.2024','Working Student / Data Scientist at Diamant Software',
     'Prepared and expanded training data for a large language model predicting invoice approvers. Developed training and evaluation workflows and trained and evaluated adapters on a multitask model.'),
    ('11.2022 - 02.2023',"Bachelor's thesis student at Diamant Software",
     'Compared relational database and Elasticsearch performance for inserting and searching log data.'),
],76,213,454,10.5,18)
c.showPage()

base(title='EDUCATION')
heading('UNIVERSITY EDUCATION',77,177)
timeline([
    ('03.2023 - 06.2025',"M.Sc. Optimization and Simulation at HSBI Bielefeld | Grade: 2.0",
     'Graduated in June 2025 (German grading scale). Focus on simulation of technical processes, discrete and bionic optimization methods, with additional modules in Data Science. Thesis research addressed multimodal data integration for AI-based maintenance support.'),
    ('09.2019 - 02.2023','Bachelor of Applied Mathematics at FH Bielefeld',
     'Applied mathematics with emphasis on Operations Research, logistics and the implementation of mathematical algorithms, including the Traveling Salesman Problem.'),
],81,215,449,10.5,22)
heading('INTERNSHIPS',77,427)
timeline([
    ('08.2022 - 10.2022','Internship at Diamant Software',
     'Developed a log-processing tool using Elasticsearch and Kibana for storage, search and visualization to support technical issue analysis.'),
    ('04.2017','Internship at Dorbath Surveying Office',
     'Gained practical experience in office and field surveying, including the use of technical instruments for measuring facilities.'),
],81,462,449,10.5,18)
heading('ADDITIONAL EXPERIENCE',77,620)
timeline([
    ('08.2020 - 05.2021','Interviewer at SOKO Institut',
     'Conducted interviews on behalf of the Federal Employment Agency.'),
    ('08.2020 - 12.2022','Mathematics Tutor at Studentenring Bielefeld',
     'Supported students of different ages in mathematics.'),
],81,651,449,10.3,13)
c.save()
print(ROOT / 'CV.pdf')

import json

def parse_response(response):

    print("Raw response:", response)  

    # gemeni formatting clean up if result in markdown blocks
    clean = response.strip()
    if clean.startswith("```"):
        clean = clean.split("```")[1]
        if clean.startswith("json"):
            clean = clean[4:]
    
    data = json.loads(clean)
    
    offset = data["first_chapter_pdf_page"] - data["first_chapter_printed_page"]

    toc = {}
    special_pages = {}
    for title, printed_page in data["toc"].items():
        if isinstance(printed_page, int):
            toc[title] = printed_page + offset
        else:
            special_pages[title] = printed_page
    return offset, toc, special_pages


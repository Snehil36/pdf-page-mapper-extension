from find_toc import find_toc
from parse_result import parse_response

def main():
    pdf_path = "/Users/snehil/Documents/pdf_page_editor/python_prototype/test_pdfs/Gilbert Strang - Introduction to Linear Algebra 6ed.pdf"
    
    print("Finding TOC...")
    response_text = find_toc(pdf_path)
    
    print("Parsing response...")
    offset, toc, special_pages = parse_response(response_text)
    
    print(f"\nFinal offset: {offset}")
    print("\nCorrected TOC:")
    for title, pdf_page in toc.items():
        print(f"{title} -> PDF page: {pdf_page}")

if __name__ == "__main__":
    main()
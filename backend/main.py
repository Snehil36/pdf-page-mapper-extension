from find_toc import find_toc
from parse_result import parse_response
from shift_page import apply_page_labels
 
 
def main():
    pdf_path = "/Users/snehil/Documents/pdf_page_editor/final/test_pdfs/182 Textbook.pdf"  
 
    print("Finding TOC...")
    response_text = find_toc(pdf_path)
 
    print("Parsing response...")
    offset, toc, special_pages = parse_response(response_text)
 
    print(f"\nFinal offset: {offset}")
    print("\nCorrected TOC:")
    for title, pdf_page in toc.items():
        print(f"{title} -> PDF page {pdf_page}")
 
    print("\nApplying page labels...")
    apply_page_labels(pdf_path, offset, output_path="corrected_output.pdf")
 
 
if __name__ == "__main__":
    main()
 
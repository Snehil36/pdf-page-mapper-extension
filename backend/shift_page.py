import pymupdf


def apply_page_labels(pdf_path, offset, output_path="corrected_output.pdf"):
    doc = pymupdf.open(pdf_path)

    doc.set_page_labels([
        {"startpage": offset, "prefix": "", "style": "D", "firstpagenum": 1},
    ])

    doc.save(output_path)
    print(f"Saved corrected PDF to {output_path}")
    print(f"PDF index {offset} now displays as page 1")

    return output_path


if __name__ == "__main__":
    apply_page_labels("/Users/snehil/Documents/pdf_page_editor/final/test_pdfs/182 Textbook.pdf", offset=5)
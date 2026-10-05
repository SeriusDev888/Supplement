"""Create a clearly labelled layout sample for the DAILY product document card."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "daily-product-information-sample.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#201854")
PINK = colors.HexColor("#c64a85")
MUTED = colors.HexColor("#6f6883")
PALE = colors.HexColor("#fff4f7")

c = canvas.Canvas(str(OUTPUT), pagesize=A4)
c.setTitle("CHASHITSU DAILY - Sample Product Information")
c.setAuthor("CHASHITSU")

c.setFillColor(PALE)
c.rect(0, PAGE_H - 135, PAGE_W, 135, fill=1, stroke=0)
c.setFillColor(NAVY)
c.setFont("Helvetica-Bold", 13)
c.drawString(42, PAGE_H - 48, "CHASHITSU")
c.setFont("Times-Roman", 30)
c.drawString(42, PAGE_H - 86, "DAILY")
c.setFont("Helvetica", 11)
c.drawString(43, PAGE_H - 107, "A little boost. A lovely day.")

c.setFillColor(PINK)
c.setFont("Helvetica-Bold", 10)
c.drawRightString(PAGE_W - 42, PAGE_H - 48, "SAMPLE - NOT A CERTIFICATION")
c.setFillColor(MUTED)
c.setFont("Helvetica", 9)
c.drawString(42, PAGE_H - 160, "Illustrative details transcribed from the supplied design reference.")
c.drawString(42, PAGE_H - 175, "Do not use these values as a confirmed product label or for purchase decisions.")

def heading(text, y):
    c.setFillColor(NAVY)
    c.setFont("Times-Roman", 18)
    c.drawString(42, y, text)
    c.setStrokeColor(colors.HexColor("#d9d3df"))
    c.line(42, y - 8, PAGE_W - 42, y - 8)

heading("Product overview", PAGE_H - 218)
c.setFillColor(MUTED)
c.setFont("Helvetica", 10)
for i, line in enumerate([
    "A daily vitamin concept inspired by citrus, Japanese landscapes,",
    "and the small rituals that make room for everyday self-care."
]):
    c.drawString(42, PAGE_H - 240 - i * 15, line)

heading("Sample supplement facts", PAGE_H - 290)
c.setFillColor(NAVY)
c.setFont("Helvetica-Bold", 9)
c.drawString(42, PAGE_H - 314, "Serving size: 1 capsule")
c.drawString(250, PAGE_H - 314, "Servings per container: 30")
c.setFillColor(PALE)
c.rect(42, PAGE_H - 346, PAGE_W - 84, 20, fill=1, stroke=0)
c.setFillColor(NAVY)
c.setFont("Helvetica-Bold", 9)
c.drawString(48, PAGE_H - 340, "Nutrient")
c.drawString(340, PAGE_H - 340, "Amount")
c.drawString(455, PAGE_H - 340, "% DV")

rows = [
    ("Vitamin C (as Ascorbic Acid)", "100 mg", "111%"),
    ("Vitamin B1 (Thiamin)", "1.2 mg", "100%"),
    ("Vitamin B2 (Riboflavin)", "1.3 mg", "100%"),
    ("Vitamin B6 (Pyridoxine HCl)", "1.7 mg", "100%"),
    ("Vitamin B12 (Methylcobalamin)", "2.4 mcg", "100%"),
    ("Folate (Folic Acid)", "400 mcg DFE", "100%"),
    ("Vitamin D3 (Cholecalciferol)", "10 mcg (400 IU)", "50%"),
    ("Zinc (as Zinc Citrate)", "10 mg", "91%"),
]
c.setFont("Helvetica", 9)
for i, (nutrient, amount, daily_value) in enumerate(rows):
    y = PAGE_H - 363 - i * 23
    c.setFillColor(NAVY)
    c.drawString(48, y, nutrient)
    c.drawString(340, y, amount)
    c.drawString(455, y, daily_value)
    c.setStrokeColor(colors.HexColor("#eeeaf0"))
    c.line(42, y - 7, PAGE_W - 42, y - 7)

heading("Before using this information", PAGE_H - 586)
c.setFillColor(MUTED)
c.setFont("Helvetica", 10)
for i, line in enumerate([
    "Confirm the final ingredient list, nutrition values, suggested use,",
    "warnings, allergens, manufacturing origin, and price with CHASHITSU.",
    "A genuine certificate can replace this sample document in Product Manager."
]):
    c.drawString(42, PAGE_H - 608 - i * 15, line)

c.setStrokeColor(colors.HexColor("#e1dbe4"))
c.line(42, 65, PAGE_W - 42, 65)
c.setFillColor(PINK)
c.setFont("Helvetica-Bold", 9)
c.drawString(42, 48, "LAYOUT SAMPLE ONLY")
c.setFillColor(MUTED)
c.setFont("Helvetica", 9)
c.drawRightString(PAGE_W - 42, 48, "CHASHITSU DAILY | 1")
c.save()
print(OUTPUT)

import sys
from bs4 import BeautifulSoup
import os
import re

TITLE_TAG = "h3"

PARSER_TYPE = "lxml"


class Listing(object):
    def __init__(self, attr_dict, content):
        self.attr_dict = attr_dict
        self.content = content

    def __str__(self):
        st = "---"
        for attr in self.attr_dict:
            st = st + "\n" + attr + ": \"" + self.attr_dict[attr].strip().replace("\n","") + "\""
        st += "\n---\n"
        st += self.content
        return st


def parse_book(listing_obj, category, description):
    attributes = {"format" : "book"}
    text = listing_obj.contents[0]
    text_until_colon = text[:text.find(":")].strip()
    if (len(listing_obj.contents) > 0): 
        attributes["author"] = text_until_colon
        year_start = listing_obj.text.rfind("(")
        attributes["title"] = listing_obj.text[listing_obj.text.find(":") + 1:year_start]
        attributes["yearReleased"] = listing_obj.text[year_start:].replace(")","").replace("(", "")
    attributes["category"] = category
    return Listing(attributes, description)

def parse_film(listing_obj, category, description, director_descriptor):
    attributes = {"format" : "film"}
    text = str(listing_obj.text)
    after_descriptor_len = 1
    if "dir" in director_descriptor:
        after_descriptor_len = 2
    text_until_parantheses = text[:text.find("(")].strip()
    if (len(listing_obj.contents) > 0): 
        attributes["title"] = text_until_parantheses
        first_parantheses = listing_obj.text.find("(")
        year_start = listing_obj.text[first_parantheses + 1:listing_obj.text.find(",", first_parantheses)]
        attributes["author"] = text[text.find(director_descriptor) + after_descriptor_len + len(director_descriptor):text.find(")", text.find(", dir"))]
        attributes["yearReleased"] = year_start
    attributes["category"] = category
    return Listing(attributes, description)

def find_description_paragraph(listing_obj):
    next_elem = listing_obj.next_sibling
    while next_elem is not None and next_elem.name != 'p':
        next_elem = next_elem.next_sibling
    if (next_elem is None):
        return ""
    ret_string = gather_contents_of_text_preserve_anchor(next_elem)
    while next_elem.next_sibling is not None and (next_elem.next_sibling.name == 'p' or str(next_elem.next_sibling) == '\n'):
        next_elem = next_elem.next_sibling
        if (hasattr(next_elem, "text")):
            ret_string += "\n" + gather_contents_of_text_preserve_anchor(next_elem)
    return ret_string

def gather_contents_of_text_preserve_anchor(obj):
    return "".join([text_or_string_preserve_anchor(element) for element in obj.contents]).replace("\n", " ").replace("\t", "")

def text_or_string_preserve_anchor(obj):
     if (hasattr(obj, "text") and obj.name != 'a'):
         return obj.text
     return str(obj)


for i in range(1, len(sys.argv)):
    file_path = sys.argv[i]
    f = open(file_path, "r")
    html = f.read()
    category = os.path.abspath(file_path).split("/")[-1].split(".")[0]
    os.mkdir(category)

    parsed_html = BeautifulSoup(html, PARSER_TYPE)

    i = 100000
    for listing_html_obj in parsed_html.findAll(TITLE_TAG):
        listing = None
        if (": " in listing_html_obj.contents[0]):
	
            listing = parse_book(listing_html_obj, category, find_description_paragraph(listing_html_obj))
        elif ", dir" in str(listing_html_obj.text):
            listing = parse_film(listing_html_obj, category, find_description_paragraph(listing_html_obj), ", dir")
      
        elif ", created by" in str(listing_html_obj.text):
            listing = parse_film(listing_html_obj, category, find_description_paragraph(listing_html_obj), ", created by")
        if listing is not None:
            fw = open(os.path.join(category, str(i) + ".md"), "w")
            fw.write(str(listing))
            i += 1

	

   
    """print("----------------New Book Listing------------")
    print("*******Title:*********\n " + str(listing_html_obj.contents))
    if (listing_html_obj.findNextSibling() is not None):
        print("*******Description:******\n" + str(listing_html_obj.findNextSibling().contents))
    else:
        print("*******No Description****\n")
    print("----------------End Book Listing------------")"""



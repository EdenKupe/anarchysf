from bs4 import BeautifulSoup
f = open("/Users/edenk/Documents/Product/Repositories/anarchysf/oldpages/a.htm", "r")
html = f.read()
parsed_html = BeautifulSoup(html)

for listing in parsed_html.findAll("h3"):
	print("----------------New Book Listing------------")
	print("*******Title:*********\n " + str(listing.contents))
	if (listing.findNextSibling() is not None):
		print("*******Description:******\n" + str(listing.findNextSibling().contents))
	else:
		print("*******No Description****\n")
	print("----------------End Book Listing------------")

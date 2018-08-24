import React from "react"
import { Helmet } from "react-helmet"

import Container from "atoms/Container"
import Image from "atoms/Image"
import Button from "atoms/Button"
import PageTemplate from "templates/PageTemplate"

import Maerong from "static/images/404.svg"

const Page404 = ({ t }) => {
	return (
		<PageTemplate maxWidth="100%" maxHeaderWidth="1170px">
			<Helmet>
				<title>404 Not Found</title>
			</Helmet>
			<Container maxWidth="478px" className="container">
				<section>
					<Image width={200} height={200} url={Maerong} />
					<h2>Page Not Found</h2>
					<p>The page does not exist or could not be displayed temporarily.</p>
					<Button blue to="/">
						Back to Home
					</Button>
				</section>
			</Container>
		</PageTemplate>
	)
}

Page404.propTypes = {}

Page404.defaultProps = {}

export default Page404

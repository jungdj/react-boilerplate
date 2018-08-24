import styled from "styled-components"
import { flexCenter, get, media } from "lib/utils"

import IconPreview from "atoms/Image"

export const ImagePreview = styled.div`
	${flexCenter};
	//position: absolute;
	cursor: pointer;
	width: auto;
	height: auto;
	padding: 12px 49px;

	img {
		max-width: 100%;
		max-height: 400px;
	}

	${IconPreview} {
		margin-bottom: 16px;
	}
	p {
		margin-bottom: 8px;
	}

	button {
		margin-bottom: 0;
	}
	${props =>
		props.disabled &&
		`
		cursor: default;
	`};
`

export const Placeholder = styled.div`
	${flexCenter};
	flex-direction: column;
	height: 186px;
	width: 100%;
	${media.tablet`height:264px;`};
`

export const Caption = styled.p`
	color: #999999;
	font-size: 12px;
	margin: 0;
`

const FileInputWrapper = styled.div`
	.drop-zone {
		${flexCenter};
		width: 100%;
		height: auto;
		min-height: 250px;
		background-color: #ffffff;
		border: solid 1px ${get("border")};
		&.accepted {
			border-color: #6c6;
			background-color: #eee;
		}
		&.rejected {
			border-color: #c66;
			background-color: #eee;
		}

		${media.tablet`min-height:340px`};
	}
`

export default FileInputWrapper

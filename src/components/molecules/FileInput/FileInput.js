import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { translate } from "react-i18next"
import Dropzone from "react-dropzone"

import Button from "atoms/Button"
import Image from "atoms/Image"

import upload from "static/images/icon/upload.png"

import FileInputWrapper, { ImagePreview, Placeholder, Caption } from "./FileInput.styled"

const sizeLimit = 5000000
const fileTypes = ["image/png", "image/jpeg"]

const Preview = ({ previewUrl, t }) => {
	let preview = (
		<Placeholder>
			<Image width={56} height={56} url={upload} />
			<p>{t("fileDesc")}</p>
			<Caption>
				{t("fileFormat", { formats: "JPG, PNG" })}, {t("fileSize", { size: "5MB" })}
			</Caption>
			<Button blueBorder type="button" onClick={e => e.preventDefault()}>
				{t("chooseFile")}
			</Button>
		</Placeholder>
	)
	if (previewUrl) preview = <img alt="Preview" src={previewUrl} />

	return <ImagePreview>{preview}</ImagePreview>
}

class FileInput extends PureComponent {
	state = { previewUrl: "" }

	onDropAccepted = accepted => {
		const { name, onChange } = this.props
		const reader = new FileReader()
		const file = accepted[0]
		if (!file) return

		reader.onloadend = () => {
			onChange({
				target: {
					name: name,
					value: file,
				},
			})
			this.setState({ previewUrl: reader.result })
		}
		reader.readAsDataURL(file)
	}

	onDropRejected = rejected => {
		const { t } = this.props

		const file = rejected[0]
		if (!file) return alert(t("fileNotFound"))
		else if (file.size > sizeLimit) return alert(t("fileTooLarge"))
		else if (fileTypes.indexOf(file.type) === -1) return alert(t("fileTypeNotSupported"))
		else alert(t("unknownError"))
	}

	render() {
		const { onDropAccepted, onDropRejected } = this
		const { previewUrl } = this.state
		const { t, caption } = this.props

		return (
			<FileInputWrapper>
				<Dropzone
					accept={fileTypes.join(", ")}
					{...{ onDropAccepted, onDropRejected }}
					acceptClassName="accepted"
					className="drop-zone"
					maxSize={sizeLimit}
					rejectClassName="rejected"
				>
					<Preview previewUrl={previewUrl} t={t} />
				</Dropzone>
				{caption && <Caption>{caption}</Caption>}
			</FileInputWrapper>
		)
	}
}

FileInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	caption: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}

FileInput.defaultProps = {
	name: "file",
}

export default translate("MyPage")(FileInput)

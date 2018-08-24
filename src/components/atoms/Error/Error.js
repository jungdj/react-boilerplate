import React from "react"
import PropTypes from "prop-types"
import { translate } from "react-i18next"

import ErrorMessage from "./Error.styled"

/* Client error message list
 	verifyEmailResent : Email verification resent
 */

const Error = ({ error, t, ...props }) => {
	let errorCode = ""
	let interpolate = {}
	if (typeof error === "string") {
		errorCode = error
	} else if (Array.isArray(error)) {
		errorCode = error[0]
		interpolate = error[1] || {}
	} else {
		errorCode = error.message
		interpolate = error.interpolate || {}
	}

	const params = ["", "MyPage:", "Auth:"].map(ns => `${ns}${errorCode}`)
	//<ErrorMessage {...props}>{t([...params, "unspecificError"], interpolate)}</ErrorMessage> // TODO: Repalce to this in Production
	return (
		<ErrorMessage {...props}>{t([...params], interpolate)}</ErrorMessage> // TODO: Only for DEV

		//switch (errorCode) {
		//	case 'invalidPhoneNumber':
		//		return <ErrorMessage {...props} >{t('MyPage:phoneNumLength')}</ErrorMessage>
		//	case 'invalidCode':
		//		return <ErrorMessage  {...props} >{t('MyPage:MP_10_26')}</ErrorMessage>
		//	case 'timeOut':
		//		return <ErrorMessage {...props} >{t('MyPage:MP_10_24')}</ErrorMessage>
		//	case 'codeResent':
		//		return <ErrorMessage {...props} >{t('MyPage:smsVerificationCodeResent')}</ErrorMessage>
		//	case 'wrongCode':
		//		return <ErrorMessage {...props} >{t('wrongVerificationCode')}</ErrorMessage>
		//	case 'cancelOTP' :
		//		return <ErrorMessage {...props} >{t('functionNotYet')}</ErrorMessage>
		//	case 'wrongFormat':
		//		return <ErrorMessage {...props} >{t('wrongFormat')}</ErrorMessage>
		//	case 'duplicatePhoneNumber':
		//		return <ErrorMessage {...props} >{t('MyPage:duplicatePhoneNumber')}</ErrorMessage>
		//	case 'emailEmpty':
		//		return <ErrorMessage {...props} >{t('Auth:emailEmpty')}</ErrorMessage>
		//	default:
		//		return <ErrorMessage {...props} >{t('somethingWrong')}</ErrorMessage>
		//}
	)
}

Error.propTypes = {
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			message: PropTypes.string.isRequired,
			interpolate: PropTypes.object,
		}),
		PropTypes.array,
	]),
}

Error.defaultProps = {}

export default translate()(Error)

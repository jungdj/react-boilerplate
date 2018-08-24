import styled from "styled-components"
import { get } from "lib/utils"

const ErrorMessage = styled.p`
	color: ${get("red")};
	margin-bottom: 8px;
`

export default ErrorMessage

import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import onClickOutside from "react-onclickoutside"

import Wrapper, { Content, Item, Head } from "./Dropdown.styled"

import { cx } from "lib/utils"

class Dropdown extends PureComponent {
	state = { show: false }
	toggle = () => this.setState(prevState => ({ show: !prevState.show }))

	handleClickOutside = () => {
		this.setState({ show: false })
	}

	render() {
		const { className, dataList, head, children, as: As } = this.props
		const { show } = this.state

		return (
			<Wrapper onClick={this.toggle} className={className}>
				<Head>{head}</Head>
				{children}
				<Content className={cx({ show })}>
					{dataList.map(({ label, ...others }, index) => (
						<Item key={index}>
							<As {...others}>{label}</As>
						</Item>
					))}
				</Content>
			</Wrapper>
		)
	}
}

Dropdown.propTypes = {
	dataList: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
			onClick: PropTypes.func,
		})
	),
}

Dropdown.defaultProps = {
	dataList: [],
	as: ({ children, ...props }) => <div {...props}>{children}</div>,
}

export default onClickOutside(Dropdown)

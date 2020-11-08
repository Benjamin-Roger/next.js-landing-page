import css from 'dom-css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

class ShadowScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            scrollTop: 0,
            scrollHeight: 0,
            clientHeight: 0
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
        const { shadowTop, shadowBottom } = this.refs;
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        css(shadowTop, { opacity: shadowTopOpacity });
        css(shadowBottom, { opacity: shadowBottomOpacity });
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: `teal`,
            opacity:0.4,
            borderRadius:50
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props} />
        );
    }

    render() {
        const { style, ...props } = this.props;
        const containerStyle = {
            ...style,
            position: 'relative'
        };
        const shadowTopStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)'
        };
        const shadowBottomStyle = {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)'
        };
        return (
            <div style={containerStyle}>
                <Scrollbars
                    ref="scrollbars"
                    onUpdate={this.handleUpdate}
                    renderThumbVertical={this.renderThumb}
                    {...props} />
                <div
                    ref="shadowTop"
                    style={shadowTopStyle} />
                <div
                    ref="shadowBottom"
                    style={shadowBottomStyle} />
            </div>
        );
    }
}

ShadowScrollbars.propTypes = {
    style: PropTypes.object
};

export default ShadowScrollbars;
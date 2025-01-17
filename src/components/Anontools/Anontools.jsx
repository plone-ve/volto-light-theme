// SemanticUI-free pre-@plone/components
// Refactor when https://github.com/plone/volto/pull/4845 is merged
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import config from '@plone/volto/registry';

/**
 * Anontools container class.
 */
export class Anontools extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    content: PropTypes.shape({
      '@id': PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: {
      '@id': null,
    },
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { settings } = config;
    return (
      !this.props.token && (
        <div className="anontools">
          {settings.showSelfRegistration && (
            <div>
              <Link aria-label="register" to="/register">
                <FormattedMessage id="Register" defaultMessage="Register" />
              </Link>
            </div>
          )}
          <div>
            <Link
              aria-label="login"
              to={`/login${
                this.props.content?.['@id']
                  ? `?return_url=${this.props.content['@id'].replace(
                      settings.apiPath,
                      '',
                    )}`
                  : ''
              }`}
            >
              <FormattedMessage id="Log in" defaultMessage="Log in" />
            </Link>
          </div>
        </div>
      )
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
  content: state.content.data,
}))(Anontools);

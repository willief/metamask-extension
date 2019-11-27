import { connect } from 'react-redux'
import { compose } from 'recompose'
import withModalProps from '../../../../helpers/higher-order-components/with-modal-props'
import DisconnectAccount from './disconnect-account.component'
import { removePermissionsFor } from '../../../../store/actions'

const mapStateToProps = state => {
  return {
    ...state.appState.modal.modalState.props || {},
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disconnectAccount: (domainKey, domain) => {
      const permissionMethodNames = domain.permissions.map(perm => perm.parentCapability)
      dispatch(removePermissionsFor({ [domainKey]: permissionMethodNames }))
    },
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  const {
    domainKey,
    domain,
  } = stateProps
  const {
    disconnectAccount: dispatchDisconnectAccount,
  } = dispatchProps

  return {
    ...stateProps,
    ...dispatchProps,
    disconnectAccount: () => dispatchDisconnectAccount(domainKey, domain),
  }
}

export default compose(
  withModalProps,
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(DisconnectAccount)

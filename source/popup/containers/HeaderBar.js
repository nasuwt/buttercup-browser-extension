import { connect } from "react-redux";
import { push } from "react-router-redux";
import { withRouter } from "react-router";
import HeaderBar from "../components/HeaderBar.js";
import { getArchives } from "../../shared/selectors/archives.js";
import { getConfigKey } from "../../shared/selectors/app.js";
import { setConfig } from "../../shared/library/messaging.js";
import { createNewTab, getExtensionURL } from "../../shared/library/extension.js";

export default withRouter(
    connect(
        (state, ownProps) => ({
            archives: getArchives(state),
            darkMode: getConfigKey(state, "darkMode")
        }),
        {
            onAboutClick: () => () => {
                createNewTab(getExtensionURL("setup.html#/about"));
            },
            onAddVaultClick: () => () => {
                createNewTab(getExtensionURL("setup.html#/add-archive"));
            },
            onItemsClick: () => dispatch => {
                dispatch(push("/"));
            },
            onLockAllClick: () => dispatch => {
                dispatch(push("/vaults/lock", { lockAll: true }));
            },
            onManageDisabledLoginPromps: () => () => {
                createNewTab(getExtensionURL("setup.html#/settings/disabled-login-domains"));
            },
            onOtherSoftwareClick: () => () => {
                createNewTab("https://buttercup.pw");
            },
            onSettingsClick: () => dispatch => {
                dispatch(push("/settings"));
            },
            onToggleDarkMode: () => (_, getState) => {
                const state = getState();
                const darkMode = getConfigKey(state, "darkMode");
                setConfig("darkMode", !darkMode);
            },
            onUnlockVaultClick: (archiveID, state) => () => {
                createNewTab(getExtensionURL(`setup.html#/access-archive/${archiveID}/${state}`));
            },
            onVaultsClick: () => dispatch => {
                dispatch(push("/vaults"));
            }
        }
    )(HeaderBar)
);

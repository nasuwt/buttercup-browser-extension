import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";
import styled from "styled-components";
import { version } from "../../../package.json";
import { ArchiveShape, ArchivesShape } from "../../shared/prop-types/archive.js";
import { VaultIcon } from "./VaultIcon";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 0.5rem 0.25rem;
`;

const ArchiveMenu = styled(Menu)`
    max-height: 250px;
    overflow: auto;
`;

class HeaderBar extends PureComponent {
    static propTypes = {
        archives: ArchivesShape,
        current: PropTypes.string,
        darkMode: PropTypes.bool,
        onAboutClick: PropTypes.func.isRequired,
        onAddVaultClick: PropTypes.func.isRequired,
        onItemsClick: PropTypes.func.isRequired,
        onLockAllClick: PropTypes.func.isRequired,
        onManageDisabledLoginPromps: PropTypes.func.isRequired,
        onOtherSoftwareClick: PropTypes.func.isRequired,
        onSettingsClick: PropTypes.func.isRequired,
        onToggleDarkMode: PropTypes.func.isRequired,
        onUnlockVaultClick: PropTypes.func.isRequired,
        onVaultsClick: PropTypes.func.isRequired
    };

    handleItemsClick(event) {
        event.preventDefault();
        this.props.onItemsClick();
    }

    handleMenuClick(event) {
        event.preventDefault();
        this.props.onMenuClick();
    }

    handleVaultClick(vault) {
        this.props.onUnlockVaultClick(vault.id, vault.state);
    }

    render() {
        const { archives, location, darkMode } = this.props;
        const archiveMenu = (
            <ArchiveMenu>
                <If condition={archives.length > 0}>
                    <MenuDivider title="Vaults:" />
                    <For each="vault" of={archives} index="index">
                        <MenuItem
                            icon={<VaultIcon vault={vault} />}
                            label={vault.status === "locked" ? <Icon icon="lock" /> : null}
                            text={vault.name}
                            key={index}
                            onClick={() => this.handleVaultClick(vault)}
                        />
                    </For>
                    <MenuDivider />
                </If>
                <MenuItem text="Add Vault" icon="add" onClick={::this.props.onAddVaultClick} />
                <MenuItem text="Lock All Vaults" icon="lock" onClick={::this.props.onLockAllClick} />
                <MenuItem icon="numbered-list" text="Manage Vaults" onClick={this.props.onVaultsClick} />
            </ArchiveMenu>
        );
        const optionsMenu = (
            <Menu>
                <MenuItem text={`Buttercup v${version}`} icon="updated" disabled />
                <MenuItem
                    text={darkMode ? "Light theme" : "Dark theme"}
                    icon={darkMode ? "flash" : "moon"}
                    onClick={::this.props.onToggleDarkMode}
                />
                <MenuDivider />
                <MenuItem text="About Buttercup" icon="info-sign" onClick={::this.props.onAboutClick} />
                <MenuItem text="Other Applications" icon="mobile-phone" onClick={::this.props.onOtherSoftwareClick} />
                <MenuDivider />
                <MenuItem text="Settings" icon="cog" onClick={::this.props.onSettingsClick} />
                <MenuItem
                    text="Manage Disabled Login Prompts"
                    icon="exclude-row"
                    onClick={::this.props.onManageDisabledLoginPromps}
                />
            </Menu>
        );
        return (
            <Container>
                <Choose>
                    <When condition={location.pathname !== "/"}>
                        <Button text="Back" icon="arrow-left" onClick={::this.props.onItemsClick} />
                    </When>
                    <When condition={location.pathname === "/" && archives.length === 0}>
                        <Button icon="add" onClick={::this.props.onAddVaultClick} />
                    </When>
                    <Otherwise>
                        <Popover content={archiveMenu} position={Position.BOTTOM_LEFT}>
                            <Button icon="shield" rightIcon="caret-down" text={"Vaults"} />
                        </Popover>
                    </Otherwise>
                </Choose>
                <Popover content={optionsMenu} position={Position.BOTTOM_RIGHT}>
                    <Button icon="cog" minimal />
                </Popover>
            </Container>
        );
    }
}

export default HeaderBar;

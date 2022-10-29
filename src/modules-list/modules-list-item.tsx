import "./modules-list-item.scss";

import { Component, ReactNode } from "react";
import { Module } from "../models/module";

type ModuleListItemProps = {
    module: Module,
    selected: boolean
}

/**
 * Item of the module list
 */
export default class ModulesListItem extends Component<ModuleListItemProps>
{
    private click()
    {
        const event = new CustomEvent("module-selection", { detail: this.props.module});
        document.dispatchEvent(event);        
    }

    render(): ReactNode {
        return (
            <div className={"modules-list-item " + (this.props.selected ? "selected" : "")} onClick={() => {this.click();}}>{this.props.module.name}</div>
        );
    }
}
import "./modules-list.scss";
import { Component, ReactNode } from "react";
import { Module } from "../models/module";
import ModulesListItem from "./modules-list-item";

type ModulesListProps = {
    modules: Module[],
    selectedModule: Module | null
}

/**
 * Modules list on the left of the screen
 */
export default class ModulesList extends Component<ModulesListProps>
{
    render(): ReactNode
    {
        return (
            <div className="modules-list">     
                {
                    this.props.modules.map((module, index) => {
                        return <ModulesListItem key={index} module={module} selected={this.props.selectedModule === module} />
                    })
                }
            </div>
        );
    }
}
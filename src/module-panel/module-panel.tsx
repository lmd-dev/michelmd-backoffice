import "./module-panel.scss"
import { Component, ReactNode } from "react";
import { Module } from "../models/module";
import { ModuleSetting } from "../models/module-setting";
import ModuleSettingField from "./module-setting-field";

type ModulePanelProps = {
    module: Module
}

/**
 * Panel listing the settings of a module
 */
export class ModulePanel extends Component<ModulePanelProps>
{
    private settingsValue = new Map<string, string>();

    constructor(props: ModulePanelProps)
    {
        super(props);

        document.addEventListener("module-setting-update", (event: any) =>
        {
            this.settingsValue.set(event.detail.name, event.detail.value);
        });
    }

    componentDidUpdate(prevProps: Readonly<ModulePanelProps>, prevState: Readonly<{}>, snapshot?: any): void
    {
        this.settingsValue.clear();

        this.props.module.settings.forEach((setting) =>
        {
            this.settingsValue.set(setting.name, setting.value);
        });
    }

    render(): ReactNode
    {
        const { module } = this.props;

        return (
            <div className="module-panel">
                <h1>{module.name}</h1>
                {
                    Array.from(module.settings.values()).map((setting: ModuleSetting, index: number) =>
                    {
                        return (<ModuleSettingField setting={setting} key={`${module.name}:${setting.name}`} />)
                    })
                }
                {
                    module.settings.size ?
                        <div className="actions">
                            <button onClick={this.save.bind(this)}>Save</button>
                        </div>
                        :
                        null
                }
            </div>
        )
    }

    save()
    {
        const { module } = this.props;

        this.settingsValue.forEach((value: string, key: string) =>
        {
            const setting = module.settings.get(key);

            if (setting)
                setting.value = value;
        });

        const event = new CustomEvent("save-module-settings", { detail: module });
        document.dispatchEvent(event);
    }
}
import "./module-setting-field.scss";
import { ChangeEvent, Component, ReactNode } from "react";
import { ModuleSetting } from "../models/module-setting";
import { ModuleSettingType } from "../models/module-setting-type";
import { Switch } from "@mui/material";

type ModuleSettingFieldProps = {
    setting: ModuleSetting;
}

/**
 * Display a setting of the selected module
 */
export default class ModuleSettingField extends Component<ModuleSettingFieldProps>
{
    updateTextField(event: ChangeEvent<HTMLInputElement>)
    {
        this.publishUpdate((event.target as HTMLInputElement).value);
    }
    updateCheckboxField(event: ChangeEvent<HTMLInputElement>)
    {
        this.publishUpdate((event.target as HTMLInputElement).checked ? "true" : "false");
    }

    private publishUpdate(value: string)
    {
        const event = new CustomEvent("module-setting-update", { detail: {name: this.props.setting.name, value: value}});

        document.dispatchEvent(event);
    }

    public render(): ReactNode
    {
        const { setting } = this.props;

        let field: ReactNode;

        switch (setting.type)
        {
            case ModuleSettingType.TEXT:    field = this.makeTextField(setting); break;
            case ModuleSettingType.LINK:    field = this.makeLinkField(setting); break;
            case ModuleSettingType.BOOLEAN: field = this.makeBooleanField(setting); break;
            case ModuleSettingType.TAGS:    field = this.makeTagsField(setting); break;
        }

        return (
            <div className="module-setting-field">
                <label>{setting.name}</label>
                {field}
            </div>
        )
    }

    private makeTextField(setting: ModuleSetting): ReactNode
    {
        return <input type="text" defaultValue={setting.value} onChange={ (event) => { this.updateTextField(event) }} />;
    }

    private makeLinkField(setting: ModuleSetting): ReactNode
    {
        return <a href={setting.value} target="_blank" rel="noreferrer" title={setting.value} >{setting.value}</a>;
    }

    private makeBooleanField(setting: ModuleSetting): ReactNode
    {
        return <Switch defaultChecked={setting.value === "true"} onChange={(event) => { this.updateCheckboxField(event) }} />;
    }

    private makeTagsField(setting: ModuleSetting): ReactNode
    {        
        const tags = setting.value !== "" ? setting.value.split(",") : [];

        return (
            <div className="tags">
                {
                    tags.map((tag, index) => { return <div className="tag" key={index}>{tag}</div>})
                }
            </div>
        )
    }
}
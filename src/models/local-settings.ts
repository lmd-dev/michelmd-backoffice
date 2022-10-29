import { Module } from "./module";
import { ModuleSettingType } from "./module-setting-type";

/**
 * Module responsible for the local settings of the backoffice
 */
class LocalSettings extends Module
{
    constructor()
    {
        super("Local settings",
            [
                {
                    name: "Bot URL",
                    type: ModuleSettingType.TEXT,
                    value: ""
                }
            ],
            true
        );
    }
}

//Unique instance of the module
export const localSettings = new LocalSettings();
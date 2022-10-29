import { ModuleSettingType } from "./module-setting-type";

export type ModuleSetting = {
    name: string,
    type: ModuleSettingType,
    value: string,
}
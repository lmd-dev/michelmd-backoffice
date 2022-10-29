import { ModuleSetting } from "./module-setting";

export interface ModuleData
{
    name: string;
    settings: Object;
    saveLocaly?: boolean;
}

/**
 * Represents a module of the bot application
 */
export class Module
{
    //Name of the module
    private _name: string;
    public get name(): string { return this._name; }

    //Settings of the module
    private readonly _settings:Map<string, ModuleSetting>;
    public get settings(): Map<string, ModuleSetting> { return this._settings; }

    //Are the settings saved localy
    private _saveLocaly: boolean = false;
    public get saveLocaly(): boolean { return this._saveLocaly; }

    /**
     * Constructor
     * @param { ModuleData } data Initialization data of the module 
     */
    constructor(name: string, settings: ModuleSetting[], saveLocaly: boolean = false)
    {
        this._name = name;

        this._settings = new Map<string, ModuleSetting>();

        settings.forEach((setting) => {
            this._settings.set(setting.name, setting);
        });

        this._saveLocaly = saveLocaly;
    }

    /**
     * Sets the settings of a module
     * @param settings 
     */
    setSettings(settings: ModuleSetting[])
    {
        this.settings.clear();

        settings.forEach((setting) =>
        {
            this.settings.set(setting.name, setting);
        })
    }

    /**
     * Returns the value of the given setting
     * @param {string} name Name of the setting to get the value
     * @returns { string}
     */
    getSetting(name: string): string | null
    {
        return this.settings.get(name)?.value ?? null;
    }

    /**
     * Returns the settings as an array
     * @returns {ModuleSetting[]}
     */
    getSettings(): ModuleSetting[]
    {
        return Array.from(this.settings.values());
    }
}
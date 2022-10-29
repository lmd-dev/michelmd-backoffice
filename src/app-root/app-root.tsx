import "./app-root.scss";
import { Component, ReactNode } from "react";
import AppHeader from "../app-header/app-header";
import { Module } from "../models/module";
import ModulesList from "../modules-list/modules-list";
import { ModulePanel } from "../module-panel/module-panel";
import { localSettings } from "../models/local-settings";
import { api } from "../models/api";
import { HomePanel } from "../home-panel/home-panel";
import { ModuleSetting } from "../models/module-setting";

type AppRootProps = {

};

type AppRootState = {
    modules: Module[],
    selectedModule: Module | null
};

/**
 * Main view of the application
 */
export default class AppRoot extends Component<AppRootProps, AppRootState>
{
    public state: AppRootState = {
        modules: [],
        selectedModule: null
    };

    /**
     * To do when the compononent is loaded
     */
    componentDidMount(): void
    {
        this.loadModules();

        document.addEventListener("module-selection", (event: any) => { this.selectModule(event.detail) });

        document.addEventListener("save-module-settings", (event: any) => { this.saveModuleSettings(event.detail) })
    }

    /**
     * Loads available module (localy and remotely)
     */
    private async loadModules()
    {
        this.loadLocalSettings(localSettings);
        this.addModule(localSettings);

        if (localSettings.getSetting("Bot URL"))
            this.loadRemoteModules();
    }

    /**
     * Loads remote available modules
     */
    private async loadRemoteModules()
    {
        const data = await api.get("/modules") as Object;

        if (data)
        {
            const modules = new Map<string, ModuleSetting[]>(Object.entries(data));

            modules.forEach((moduleSettings, moduleName) =>
            {
                this.addModule(new Module(moduleName, moduleSettings));
            })

        }
    }

    /**
     * Adds a module to the known modules list
     * @param {Module} module 
     */
    private addModule(module: Module)
    {
        this.setState((prevState) => { return { modules: [...prevState.modules, module] } });
    }

    /**
     * Selects a module to display its settings
     * @param module 
     */
    private selectModule(module: Module)
    {
        this.setState({ selectedModule: module });
    }

    /**
     * Saves settings of a module
     * @param {Module} module 
     */
    private saveModuleSettings(module: Module)
    {
        if (module.saveLocaly)
            this.saveLocalSettings(module);
        else
            this.saveRemoteSettings(module);
    }

    /**
     * Saves localy the settings of a module
     * @param module 
     */
    private saveLocalSettings(module: Module)
    {
        const moduleSettings: any = {};
        module.settings.forEach((setting) =>
        {
            moduleSettings[setting.name] = setting.value;
        });

        let localSettings: any = {};
        const localSettingsJSON = localStorage.getItem("localSettings");

        if (localSettingsJSON)
            localSettings = JSON.parse(localSettingsJSON);

        localSettings[module.name] = moduleSettings;

        localStorage.setItem("localSettings", JSON.stringify(localSettings));

        window.location.reload();
    }

    /**
     * Saves remotely the settings of a module
     * @param {Module} module
     */
    private saveRemoteSettings(module: Module)
    {
        api.post("/modules/" + module.name, { body: module.getSettings() });
    }

    /**
     * Loads setting of a module from the local storage
     * @param {Module} module 
     */
    private loadLocalSettings(module: Module)
    {
        let localSettings: any = {};
        const localSettingsJSON = localStorage.getItem("localSettings");

        if (localSettingsJSON)
            localSettings = JSON.parse(localSettingsJSON);

        const settings: any = localSettings[module.name];
        if (settings)
        {
            Object.keys(settings).forEach((key) =>
            {
                const setting = module.settings.get(key);
                if (setting)
                    setting.value = settings[key];
            })
        }
    }

    /**
     * Renders the component
     * @returns 
     */
    public render(): ReactNode
    {
        return (
            <div className="app-root">
                <AppHeader />
                <div className="app-content">
                    <ModulesList modules={ this.state.modules } selectedModule={ this.state.selectedModule } />
                    {
                        this.state.selectedModule ?
                            <ModulePanel module={ this.state.selectedModule } /> :
                            <HomePanel />
                    }
                </div>
            </div>
        );
    }
}
import { localSettings } from "./local-settings";

export interface APIOptions {
    body?: any,
    contentType?: string
}

/**
 * Class responsible for manage request to the Bot API
 */
class API
{
    /**
     * Processes a GET request
     * @param {string} url URL to request 
     * @returns {any}
     */
    public async get(url: string): Promise<any>
    {
        return this.request(url, "GET");
    }

    /**
     * Processes a POST request
     * @param {string } url URL to request 
     * @param {APIOptions} data request options 
     * @returns {any}
     */
    public async post(url: string, data: APIOptions = {}): Promise<any>
    {
        return this.request(url, "POST", {
            body: data.body ? JSON.stringify(data.body) : undefined,
            contentType: "application/json"
        });
    }

    /**
     * Processes a request to the BOT API
     * @param {string} url URL to request 
     * @param {string} method Method to use 
     * @param {APIOptions} options Request options
     * @returns {any}
     */
    private async request(url: string, method: string, options: APIOptions = {}): Promise<any>
    {
        try
        {
            const host = localSettings.getSetting("Bot URL");

            const response = await fetch(`${host}${url}`, {
                method: method,
                body: options.body ?? undefined,
                headers: options.contentType ? { "Content-Type": options.contentType } : undefined
            });

            if (response.status === 200)
            {
                try {
                    return await response.json();
                }
                catch(error)
                {
                    return await response.text();
                }
            }
        }
        catch (error)
        {
            console.error(error);

            return null;
        }
    }
}

//API service
export const api = new API();
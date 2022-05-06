export interface IConfig {
    PORT: number;
    SECRET: string;
    CONNECTION_STRING: string;
}

const config: IConfig = {
    PORT: parseInt(process.env.PORT as string) || 3000,
    SECRET: process.env.SECRET as string,
    CONNECTION_STRING: process.env.CONNECTION_STRING as string
};

export default config;
declare namespace Log {

    interface Data {
        id?: string;
        priority: number;
        type: Type;
        ip: string;
        hostname: string;
        program: string;
        pid?: number | null;
        message: string;
        data?: Record<string, any> | any | null;
        created_at?: string;
      }

   export enum Type {
        INFO = "INFO",
        DEBUG = "DEBUG",
        ERROR = "ERROR",
        WARNING = "WARNING",
        AUDIT = "AUDIT",
        ACCESS = "ACCESS",
        PERFORMANCE = "PERFORMANCE",
        SECURITY = "SECURITY",
        SYSTEM = "SYSTEM",
        CUSTOM = "CUSTOM",
        TRANSACTION = "TRANSACTION",
        DIAGNOSTIC = "DIAGNOSTIC",
        CHANGE = "CHANGE",
        EVENT = "EVENT",
        ERROR_REPORTING = "ERROR_REPORTING",
        DEPENDENCY = "DEPENDENCY",
        VERBOSE = "VERBOSE",
      }      
}
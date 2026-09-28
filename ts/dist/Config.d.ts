import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
            optspec: {
                entity: string;
                net: string;
            };
            strict: boolean;
            transport: string;
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
            name: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            account: {};
            account_setting: {};
            cache_purge_api_response_single_id: {};
            cps_communication_preference: {};
            iam_api_response_single_id: {};
            iam_response_single_account: {};
            iam_single_user: {};
            kamino_environment: {};
            resource: {};
            resource_tagging: {};
            resource_tagging_tag_key_summary_response_collection: {};
            resource_tagging_tag_keys_response_collection: {};
            resource_tagging_tag_values_response_collection: {};
            resource_tagging_tagged_resource_response_single: {};
            zone: {};
            zone_hold: {};
        };
    };
    entity: {
        account: {
            fields: {
                name: string;
                title: string;
                type: string;
            }[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {
                            $action: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                account_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        account_setting: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        cache_purge_api_response_single_id: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        cps_communication_preference: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        iam_api_response_single_id: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            header: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: number;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        iam_response_single_account: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                account_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param?: undefined;
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                account_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                            $action?: undefined;
                        };
                    })[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        iam_single_user: {
            fields: ({
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        kamino_environment: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                patch: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                environment_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        resource: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: boolean;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string[];
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        resource_tagging: {
            fields: never[];
            name: string;
            op: {
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            header: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        resource_tagging_tag_key_summary_response_collection: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        resource_tagging_tag_keys_response_collection: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        resource_tagging_tag_values_response_collection: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            })[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        resource_tagging_tagged_resource_response_single: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                                reqd?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            header: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        zone: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                op?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
                op?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                op?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                op?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                op: {
                    list: {
                        type: string;
                    };
                };
                short?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: number;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                            $action?: undefined;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        zone_hold: {
            fields: ({
                name: string;
                title: string;
                type: string;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                short?: undefined;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_name: string;
                                zone_id?: undefined;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                                zone_name?: undefined;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    })[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                zone_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };

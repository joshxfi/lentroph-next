import builder from "./builder";

builder.queryType({});
builder.mutationType({});

import "./models/user";
import "./models/post";

export const schema = builder.toSchema();

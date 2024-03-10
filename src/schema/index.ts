import builder from "./builder";

builder.queryType({});
builder.mutationType({});

import "./models/user";
import "./models/post";
import "./models/donation";
import "./models/organization";

export const schema = builder.toSchema();

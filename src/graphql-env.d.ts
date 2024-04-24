/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: {
    'AddOrgInput': { kind: 'INPUT_OBJECT'; name: 'AddOrgInput'; inputFields: [{ name: 'bio'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'image'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'Boolean': unknown;
    'Date': unknown;
    'Donation': { kind: 'OBJECT'; name: 'Donation'; fields: { 'amount': { name: 'amount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'org': { name: 'org'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'Float': unknown;
    'ID': unknown;
    'Int': unknown;
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'addOrg': { name: 'addOrg'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; } }; 'addOrgPost': { name: 'addOrgPost'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Post'; ofType: null; }; } }; 'addPost': { name: 'addPost'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Post'; ofType: null; }; } }; 'approveOrg': { name: 'approveOrg'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; } }; 'editOrg': { name: 'editOrg'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; } }; 'removeOrg': { name: 'removeOrg'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'updateBio': { name: 'updateBio'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'updateUsername': { name: 'updateUsername'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'Organization': { kind: 'OBJECT'; name: 'Organization'; fields: { 'bio': { name: 'bio'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; 'donations': { name: 'donations'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Donation'; ofType: null; }; }; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'image': { name: 'image'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'isApproved': { name: 'isApproved'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'owner': { name: 'owner'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'posts': { name: 'posts'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Post'; ofType: null; }; }; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; } }; 'username': { name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Post': { kind: 'OBJECT'; name: 'Post'; fields: { 'author': { name: 'author'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'comments': { name: 'comments'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Post'; ofType: null; }; }; }; } }; 'content': { name: 'content'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'imgUrl': { name: 'imgUrl'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'org': { name: 'org'; type: { kind: 'OBJECT'; name: 'Organization'; ofType: null; } }; 'sdg': { name: 'sdg'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'donations': { name: 'donations'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Donation'; ofType: null; }; }; }; } }; 'getOrg': { name: 'getOrg'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; } }; 'getUser': { name: 'getUser'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'getUserOrgs': { name: 'getUserOrgs'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; }; }; } }; 'orgs': { name: 'orgs'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; }; }; } }; 'posts': { name: 'posts'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Post'; ofType: null; }; }; }; } }; 'users': { name: 'users'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; }; }; } }; }; };
    'String': unknown;
    'User': { kind: 'OBJECT'; name: 'User'; fields: { 'bio': { name: 'bio'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; 'email': { name: 'email'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'image': { name: 'image'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'orgs': { name: 'orgs'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Organization'; ofType: null; }; }; }; } }; 'posts': { name: 'posts'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Post'; ofType: null; }; }; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; } }; 'username': { name: 'username'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}
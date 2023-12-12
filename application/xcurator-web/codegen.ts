import * as dotenv from 'dotenv';
dotenv.config();
import type { CodegenConfig } from '@graphql-codegen/cli';
import { env } from 'next-runtime-env';

const GRAPHQL_API = env('NEXT_PUBLIC_GATEWAY_API');

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_API,
  documents: './src/graphql/**/*.graphql',
  generates: {
    './src/graphql/_generated/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'named-operations-object',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        {
          add: {
            content: '/* tslint-disable */',
          },
        },
      ],
    },
  },
  config: {
    scalars: {
      URL: 'string',
    },
  },
};

export default config;

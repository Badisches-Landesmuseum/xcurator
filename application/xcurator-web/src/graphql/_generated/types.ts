/* eslint-disable */
/* tslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Duration: { input: any; output: any; }
  EMail: { input: any; output: any; }
  HTML: { input: any; output: any; }
  IIIFIdentifier: { input: any; output: any; }
  Latitude: { input: any; output: any; }
  LocalDate: { input: any; output: any; }
  Longitude: { input: any; output: any; }
  RGB: { input: any; output: any; }
  URL: { input: string; output: string; }
  Upload: { input: any; output: any; }
};

/** ## Inputs */
export type AddArtefactInput = {
  artefactId: Scalars['ID']['input'];
  storyId: Scalars['ID']['input'];
};

export type Artefact = {
  __typename?: 'Artefact';
  /** date, e.g. of the artefact is made */
  dateRange?: Maybe<DateRange>;
  /** description of the artefact */
  description?: Maybe<Scalars['String']['output']>;
  /** List of entities (person, location, organisation) found in text formations (e.g. title, description) */
  entities: Array<NamedEntity>;
  /** xCurator Identifier */
  id: Scalars['String']['output'];
  /** images of the artefact itself */
  images: Array<Image>;
  /** Keywords related to the artefact (Schlagworte, defined by the external datasource) */
  keywords: Array<Scalars['String']['output']>;
  /** List of locations. e.g. the location the artefacts current location. */
  locations: Array<Location>;
  /** List of materiels. e.g. the artefact is made of (paper, silver..) */
  materials: Array<Scalars['String']['output']>;
  /** List of persons the artefact related with (creator) */
  persons: Array<Person>;
  /** Information about the external data source the artefact data is imported from */
  sourceInfo: DataSource;
  tags: Array<SearchTag>;
  /** List of techniques the artefact is made with */
  techniques: Array<Scalars['String']['output']>;
  /** name and or title of the artefact (multi-lingual) */
  title: Scalars['String']['output'];
};

/** colors used the artefacts are grouped in. */
export enum ArtefactColor {
  Black = 'BLACK',
  Blue = 'BLUE',
  Gray = 'GRAY',
  Green = 'GREEN',
  Hotpink = 'HOTPINK',
  Orange = 'ORANGE',
  Purple = 'PURPLE',
  Red = 'RED',
  Saddlebrown = 'SADDLEBROWN',
  Turquoise = 'TURQUOISE',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type ArtefactConnection = {
  __typename?: 'ArtefactConnection';
  edges: Array<ArtefactEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ArtefactEdge = {
  __typename?: 'ArtefactEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Artefact>;
};

/** Historical epochs represented as enums. */
export enum ArtefactEpoch {
  Antike = 'ANTIKE',
  Barock = 'BAROCK',
  FruehesMittelalter = 'FRUEHES_MITTELALTER',
  Gotik = 'GOTIK',
  Moderne = 'MODERNE',
  Postmoderne = 'POSTMODERNE',
  Renaissance = 'RENAISSANCE',
  Romanik = 'ROMANIK',
  Romantik = 'ROMANTIK',
  UrUndFruehgeschichte = 'UR_UND_FRUEHGESCHICHTE'
}

export type ArtefactFavouriteInput = {
  /** artefact (identifier) to be added as favourite  */
  id: Scalars['ID']['input'];
};

export type ArtefactNotification = {
  __typename?: 'ArtefactNotification';
  artefact: Artefact;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type ArtefactNotificationInput = {
  artefactId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type ArtefactNotificationUniqueInput = {
  id: Scalars['ID']['input'];
};

export type ArtefactOrderByInput = {
  createdAt?: InputMaybe<SortDirection>;
  updatedAt?: InputMaybe<SortDirection>;
};

export enum ArtefactSourceOwner {
  Ap = 'AP',
  Blm = 'BLM'
}

/** ### Inputs */
export type ArtefactUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  language: Language;
};

export type AuthError = {
  __typename?: 'AuthError';
  error: Scalars['String']['output'];
  error_description: Scalars['String']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type BlmUser = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  roles: Array<InputMaybe<Scalars['String']['input']>>;
  uuid: Scalars['ID']['input'];
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

/** represents the amount of items in the database related to that color (group). */
export type ColorFacette = {
  __typename?: 'ColorFacette';
  color: ArtefactColor;
  count: Scalars['Int']['output'];
};

/** #### ENUMS */
export enum Continent {
  Africa = 'AFRICA',
  America = 'AMERICA',
  Asia = 'ASIA',
  Europa = 'EUROPA'
}

export type ContinentFacette = {
  __typename?: 'ContinentFacette';
  continent: Continent;
  countries?: Maybe<Array<CountryFacette>>;
  totalCount: Scalars['Int']['output'];
};

export type CountryFacette = {
  __typename?: 'CountryFacette';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateModuleInput = {
  artefactIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  storyId: Scalars['ID']['input'];
  thought: Scalars['String']['input'];
};

export type CreateUserProfileInput = {
  /** users preferred language the xCurator should set up */
  preferredLanguage: Language;
  /** user id, given by the idp provider (e.g. keycloak) */
  sub: Scalars['ID']['input'];
  username: Scalars['String']['input'];
};

export type DataNotification = {
  __typename?: 'DataNotification';
  /** the artefact the wrong data is stored */
  artefact: Artefact;
  /** descripion about the wrong data (e.g. missing or wrong date field) */
  message: Scalars['String']['output'];
};

export type DataSource = {
  __typename?: 'DataSource';
  /** Source Collection name */
  collection: Scalars['String']['output'];
  /** Source Identifier (external data source) */
  id: Scalars['String']['output'];
  /** default language of the source */
  language: Language;
  /** Owner of the artefact data e.g. Institute or Person (BLM | AP) */
  owner: Scalars['String']['output'];
  /** url linked to a detail view of the source. */
  url?: Maybe<Scalars['URL']['output']>;
};

export type DateRange = {
  __typename?: 'DateRange';
  end?: Maybe<Scalars['LocalDate']['output']>;
  literal?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['LocalDate']['output']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DeleteArtefactFromBasketInput = {
  artefactId: Scalars['ID']['input'];
  storyId: Scalars['ID']['input'];
};

export type DeleteArtefactInput = {
  artefactId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
  storyId: Scalars['ID']['input'];
};

export type DeleteArtefactNotificationInput = {
  id: Scalars['String']['input'];
};

export type DeleteModuleInput = {
  moduleId: Scalars['ID']['input'];
  storyId: Scalars['ID']['input'];
};

export type DeleteStoryInput = {
  storyId: Scalars['ID']['input'];
};

export type DeleteStoryNotificationInput = {
  id: Scalars['ID']['input'];
};

/** represents the amount of items in the database related to that epoch. */
export type EpochFacette = {
  __typename?: 'EpochFacette';
  count: Scalars['Int']['output'];
  epoch: ArtefactEpoch;
};

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN'
}

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN'
}

export type ExploreFacette = {
  __typename?: 'ExploreFacette';
  colorFacette: Array<ColorFacette>;
  epochFacette: Array<EpochFacette>;
  locationFacette: Array<ContinentFacette>;
  materialFacette: Array<MaterialFacette>;
  sourceFacette: Array<SourceFacette>;
};

/** Single item on the result grid, represents a artefact or story. */
export type ExploreGridItem = {
  __typename?: 'ExploreGridItem';
  /** search result item, can be of the type artefact or story. */
  item: ExploreItem;
  /** coordinate of the item inside the grid. */
  pinning: Pinning;
  /** size of the item itself inside the grid. */
  size: ExploreItemSize;
};

/**  this is bad for frontend */
export type ExploreItem = Artefact | Story;

/** Size of a ExploreItem inside the grid. e.g. width. 2 means the item spans over two boxes inside the grid. */
export type ExploreItemSize = {
  __typename?: 'ExploreItemSize';
  height: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

/** Search input options to execute a search in the explore mode. */
export type ExploreSearchInput = {
  colors?: InputMaybe<Array<ArtefactColor>>;
  epochs?: InputMaybe<Array<ArtefactEpoch>>;
  language: Language;
  locations?: InputMaybe<Array<Scalars['String']['input']>>;
  materials?: InputMaybe<Array<Material>>;
  owner?: InputMaybe<Array<ArtefactSourceOwner>>;
  query: Scalars['String']['input'];
  tags?: InputMaybe<Array<SearchTagInput>>;
};

/** full search result grid. */
export type ExploreSearchResult = {
  __typename?: 'ExploreSearchResult';
  /** Element with the best scoring. */
  bestMatch?: Maybe<ExploreGridItem>;
  facette: ExploreFacette;
  /** information about the size of the grid. */
  gridInfo: GridInfo;
  /** all search result items. */
  items: Array<ExploreGridItem>;
  /** Query string used by the search. */
  queryString: Scalars['String']['output'];
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type GridInfo = {
  __typename?: 'GridInfo';
  columns: Scalars['Int']['output'];
  rows: Scalars['Int']['output'];
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  __typename?: 'Image';
  /** height in pixels. */
  height: Scalars['Int']['output'];
  /** URL to the licence */
  licence: Licence;
  /** person name of the photographer. */
  photographer?: Maybe<Scalars['String']['output']>;
  /** URL to request the image data. Be aware of IIIF URL's and other formats for dynamic scaling! */
  url: Scalars['URL']['output'];
  /** width in pixels. */
  width: Scalars['Int']['output'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeycloakUser = {
  __typename?: 'KeycloakUser';
  acr: Scalars['String']['output'];
  azp: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  email_verified: Scalars['Boolean']['output'];
  exp: Scalars['Int']['output'];
  family_name: Scalars['String']['output'];
  given_name: Scalars['String']['output'];
  iat: Scalars['Int']['output'];
  iss: Scalars['String']['output'];
  jti: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  preferred_username: Scalars['String']['output'];
  roles: Array<Maybe<Scalars['String']['output']>>;
  scope: Scalars['String']['output'];
  session_state: Scalars['String']['output'];
  sid: Scalars['String']['output'];
  sub: Scalars['ID']['output'];
  typ: Scalars['String']['output'];
};

export type LlmTemplate = {
  __typename?: 'LLMTemplate';
  systemTemplate: Scalars['String']['output'];
  userTemplate: Scalars['String']['output'];
};

export type LlmTemplateInput = {
  systemTemplate: Scalars['String']['input'];
  userTemplate: Scalars['String']['input'];
};

export enum Language {
  De = 'DE',
  En = 'EN',
  Nl = 'NL'
}

export type LanguageInput = {
  language: Language;
};

export type Licence = {
  __typename?: 'Licence';
  name: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export enum LicenceType {
  Cc0 = 'CC0',
  CcBy = 'CC_BY',
  CcByNc = 'CC_BY_NC',
  CcByNcNd = 'CC_BY_NC_ND',
  CcByNcSa = 'CC_BY_NC_SA',
  CcByNd = 'CC_BY_ND',
  CcBySa = 'CC_BY_SA'
}

export type LinkedData = {
  __typename?: 'LinkedData';
  id: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type LinkedDataBySource = {
  __typename?: 'LinkedDataBySource';
  link: LinkedData;
  source: LinkedDataSource;
};

export enum LinkedDataSource {
  Gnd = 'GND',
  Wikidata = 'WIKIDATA',
  Wikipedia = 'WIKIPEDIA'
}

export type Location = {
  __typename?: 'Location';
  /** country name */
  countryName?: Maybe<Scalars['String']['output']>;
  /** Latitude of the location */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the location */
  lon?: Maybe<Scalars['Float']['output']>;
  /** location name */
  name: Scalars['String']['output'];
};

export enum Material {
  Bronze = 'BRONZE',
  Ceramics = 'CERAMICS',
  Glass = 'GLASS',
  Iron = 'IRON',
  Movie = 'MOVIE',
  PePaper = 'PE_PAPER',
  PhotoLayer = 'PHOTO_LAYER',
  PhotoPaper = 'PHOTO_PAPER',
  Porcelain = 'PORCELAIN',
  Silver = 'SILVER',
  Wood = 'WOOD'
}

export type MaterialFacette = {
  __typename?: 'MaterialFacette';
  count: Scalars['Int']['output'];
  material: Material;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Basket */
  addArtefactToBasket: Story;
  /**  Favourite's */
  addArtefactToFavourite: Scalars['ID']['output'];
  authenticate: AuthResponse;
  authenticateBLM: AuthResponse;
  /** create a story module including 1-3 artefacts. */
  createModule: StoryTextModule;
  /** create a empty story */
  createStory: Story;
  createUserProfile?: Maybe<UserProfile>;
  deleteArtefactFromBasket: Story;
  deleteArtefactFromFavourite: Scalars['String']['output'];
  deleteArtefactNotification?: Maybe<Scalars['String']['output']>;
  /** delete a story module */
  deleteModule?: Maybe<Scalars['String']['output']>;
  deleteStory?: Maybe<Scalars['String']['output']>;
  deleteStoryNotification?: Maybe<Scalars['String']['output']>;
  deleteUserProfile?: Maybe<Scalars['String']['output']>;
  /**  TODO this is most probably a query and not a mutation */
  exportProfile: Scalars['String']['output'];
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  /** Publish a story */
  publishStory: Story;
  /** Rate a story */
  rateStory: Scalars['Float']['output'];
  /**  Artefact related notifications */
  reportArtefact: ArtefactNotification;
  /**  Story related notifications */
  reportStory: Notification;
  setStoryConclusion: Story;
  setStoryConclusionTemplate: LlmTemplate;
  setStoryIntroduction: Story;
  setStoryIntroductionTemplate: LlmTemplate;
  setStoryModulThoughtPrompt: LlmTemplate;
  /** Unpublish a story */
  unpublishStory: Story;
  updateArtefactNotification: ArtefactNotification;
  /** update a story module (including add/remove artefacts) */
  updateModule: StoryTextModule;
  updateStory: Story;
  updateStoryNotification: Notification;
  updateUserProfile?: Maybe<UserProfile>;
  verifyEntity: NamedEntity;
};


export type MutationAddArtefactToBasketArgs = {
  create: AddArtefactInput;
};


export type MutationAddArtefactToFavouriteArgs = {
  create: ArtefactFavouriteInput;
};


export type MutationAuthenticateArgs = {
  access_token: Scalars['String']['input'];
  expires_in: Scalars['Int']['input'];
  refresh_token: Scalars['String']['input'];
};


export type MutationAuthenticateBlmArgs = {
  access_token: Scalars['String']['input'];
  blmUser: BlmUser;
  expires_in: Scalars['Int']['input'];
  refresh_token: Scalars['String']['input'];
};


export type MutationCreateModuleArgs = {
  create: CreateModuleInput;
  language: Language;
};


export type MutationCreateStoryArgs = {
  create: StoryInput;
};


export type MutationCreateUserProfileArgs = {
  create: CreateUserProfileInput;
};


export type MutationDeleteArtefactFromBasketArgs = {
  delete: DeleteArtefactFromBasketInput;
};


export type MutationDeleteArtefactFromFavouriteArgs = {
  delete: ArtefactFavouriteInput;
};


export type MutationDeleteArtefactNotificationArgs = {
  delete: DeleteArtefactNotificationInput;
};


export type MutationDeleteModuleArgs = {
  delete: DeleteModuleInput;
};


export type MutationDeleteStoryArgs = {
  delete: DeleteStoryInput;
};


export type MutationDeleteStoryNotificationArgs = {
  delete: DeleteStoryNotificationInput;
};


export type MutationDeleteUserProfileArgs = {
  delete: UserUniqueInput;
};


export type MutationExportProfileArgs = {
  where: UserUniqueInput;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationPublishStoryArgs = {
  where: PublishStoryInput;
};


export type MutationRateStoryArgs = {
  where: RateStoryInput;
};


export type MutationReportArtefactArgs = {
  create: ArtefactNotificationInput;
};


export type MutationReportStoryArgs = {
  create: StoryNotificationInput;
};


export type MutationSetStoryConclusionArgs = {
  where: StoryConclusionInput;
};


export type MutationSetStoryConclusionTemplateArgs = {
  where: LlmTemplateInput;
};


export type MutationSetStoryIntroductionArgs = {
  where: StoryIntroductionInput;
};


export type MutationSetStoryIntroductionTemplateArgs = {
  where: LlmTemplateInput;
};


export type MutationSetStoryModulThoughtPromptArgs = {
  where: LlmTemplateInput;
};


export type MutationUnpublishStoryArgs = {
  where: PublishStoryInput;
};


export type MutationUpdateArtefactNotificationArgs = {
  update: UpdateArtefactNotificationInput;
};


export type MutationUpdateModuleArgs = {
  update: UpdateModuleInput;
};


export type MutationUpdateStoryArgs = {
  update: UpdateStoryInput;
};


export type MutationUpdateStoryNotificationArgs = {
  update: UpdateStoryNotificationInput;
};


export type MutationUpdateUserProfileArgs = {
  update: UpdateUserProfileInput;
};


export type MutationVerifyEntityArgs = {
  where: VerifyEntityInput;
};

export type NamedEntity = {
  __typename?: 'NamedEntity';
  endPosition: Scalars['Int']['output'];
  linkedData: Array<LinkedDataBySource>;
  literal: Scalars['String']['output'];
  property: Scalars['String']['output'];
  startPosition: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type NamedEntityDetail = {
  __typename?: 'NamedEntityDetail';
  description: Scalars['String']['output'];
  image?: Maybe<Scalars['URL']['output']>;
  title: Scalars['String']['output'];
};

export type NamedEntityDetailInput = {
  language: Language;
  wikidataId: Scalars['String']['input'];
  wikipediaId: Scalars['String']['input'];
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<NestedIdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedUrlFilter = {
  contains?: InputMaybe<Scalars['URL']['input']>;
  endsWith?: InputMaybe<Scalars['URL']['input']>;
  equals?: InputMaybe<Scalars['URL']['input']>;
  in?: InputMaybe<Array<Scalars['URL']['input']>>;
  notIn?: InputMaybe<Array<Scalars['URL']['input']>>;
  startsWith?: InputMaybe<Scalars['URL']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  story: Story;
};

/**
 * Spec: https://www.graphql-scalars.dev/docs/scalars/local-date
 * Relay
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Person = {
  __typename?: 'Person';
  /** The person full name (e.g. eva mueller) */
  name: Scalars['String']['output'];
};

/** Coordinate where the ExploreItem is pinned inside the grid system. (the grid is starting at position 0,0 (left, top) */
export type Pinning = {
  __typename?: 'Pinning';
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export enum ProfileEpoch {
  Antiquity = 'ANTIQUITY',
  MiddleAges = 'MIDDLE_AGES',
  ModernAndPresent = 'MODERN_AND_PRESENT',
  PreAndEarlyHistory = 'PRE_AND_EARLY_HISTORY'
}

export type PublishStoryInput = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** get a single artefact by id */
  artefact: Artefact;
  conclusionTemplate: LlmTemplate;
  /** fetch details information's about the entity from wikidata */
  entitiesDetail: NamedEntityDetail;
  generateConclusion: Scalars['String']['output'];
  generateIntroduction: Scalars['String']['output'];
  generateThought: Scalars['String']['output'];
  introductionTemplate: LlmTemplate;
  me?: Maybe<User>;
  /** get users (xCurator) favourites */
  myFavourites: Array<Artefact>;
  myStories: Array<Story>;
  /** get users (xCurator) profile */
  profile?: Maybe<UserProfile>;
  /** get a random pre-defined query string for explore search */
  queryString: Scalars['String']['output'];
  /** search by randomized queryString string, defined in the backend. */
  randomizedExplore: ExploreSearchResult;
  reportedArtefact: ArtefactNotification;
  reportedArtefacts: Array<ArtefactNotification>;
  reportedStories: Array<Notification>;
  reportedStory: Notification;
  /** search optimized for exploring artefacts and stories, displayed on a grid. */
  searchExplore: ExploreSearchResult;
  /** similar artefacts calculated by a given artefact */
  searchSimilarArtefacts: Array<Artefact>;
  /**  TODO going to change this now to a list of stories, but later on I will use Story connection declared below */
  stories: Array<Story>;
  story?: Maybe<Story>;
  /** suggestions based on a given query string */
  suggestExplore?: Maybe<Array<SearchSuggest>>;
  suggestRelatedArtefacts: Array<Artefact>;
  thoughtTemplate: LlmTemplate;
};


export type QueryArtefactArgs = {
  where: ArtefactUniqueInput;
};


export type QueryEntitiesDetailArgs = {
  where: NamedEntityDetailInput;
};


export type QueryGenerateConclusionArgs = {
  where: StoryConclusionGenerateInput;
};


export type QueryGenerateIntroductionArgs = {
  where: StoryIntroductionGenerateInput;
};


export type QueryGenerateThoughtArgs = {
  where: StoryModuleThoughtInput;
};


export type QueryMyStoriesArgs = {
  language: Language;
  orderBy?: InputMaybe<Array<StoryOrderByInput>>;
  where?: InputMaybe<StoriesWhereInput>;
};


export type QueryQueryStringArgs = {
  where: LanguageInput;
};


export type QueryRandomizedExploreArgs = {
  take: Scalars['Int']['input'];
  where: LanguageInput;
};


export type QueryReportedArtefactArgs = {
  language: Language;
  where: ArtefactNotificationUniqueInput;
};


export type QueryReportedArtefactsArgs = {
  language: Language;
};


export type QueryReportedStoriesArgs = {
  language: Language;
};


export type QueryReportedStoryArgs = {
  language: Language;
  where: StoryNotificationUniqueInput;
};


export type QuerySearchExploreArgs = {
  take: Scalars['Int']['input'];
  where: ExploreSearchInput;
};


export type QuerySearchSimilarArtefactsArgs = {
  take: Scalars['Int']['input'];
  where: ArtefactUniqueInput;
};


export type QueryStoriesArgs = {
  language: Language;
  orderBy?: InputMaybe<StoryOrderByInput>;
  where?: InputMaybe<StoriesWhereInput>;
};


export type QueryStoryArgs = {
  where: StoryUniqueInput;
};


export type QuerySuggestExploreArgs = {
  where: SuggestExploreInput;
};


export type QuerySuggestRelatedArtefactsArgs = {
  take: Scalars['Int']['input'];
  where: SuggestRelatedArtefactsInput;
};

export type RateStoryInput = {
  id: Scalars['ID']['input'];
  rating: Scalars['Float']['input'];
};

export type SearchSuggest = {
  __typename?: 'SearchSuggest';
  text: Scalars['String']['output'];
  type: SuggestType;
};

export type SearchTag = {
  __typename?: 'SearchTag';
  isUsingAI: Scalars['Boolean']['output'];
  literal: Scalars['String']['output'];
  type: SearchTagType;
};

export type SearchTagInput = {
  literal: Scalars['String']['input'];
  type: SearchTagType;
};

export enum SearchTagType {
  EntityLocation = 'ENTITY_LOCATION',
  EntityOrganisation = 'ENTITY_ORGANISATION',
  EntityPerson = 'ENTITY_PERSON',
  Keyword = 'KEYWORD',
  Location = 'LOCATION',
  Material = 'MATERIAL',
  Person = 'PERSON',
  Technique = 'TECHNIQUE'
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** represents the amount of items in the database owned by the source owner. */
export type SourceFacette = {
  __typename?: 'SourceFacette';
  count: Scalars['Int']['output'];
  owner: ArtefactSourceOwner;
};

export type StoriesWhereInput = {
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Story = {
  __typename?: 'Story';
  artefactBasket?: Maybe<Array<Maybe<Artefact>>>;
  /** author of the story */
  author: User;
  /** (optional) conclusion of a story */
  conclusion?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** xCurator Identifier */
  id: Scalars['String']['output'];
  /** (optional) introduction of a story */
  introduction?: Maybe<Scalars['String']['output']>;
  isPublished: Scalars['Boolean']['output'];
  /** primary language the story is made of (implicit the prefered language of the author) */
  language: Language;
  /**  Licence of the story */
  licence: LicenceType;
  /** Story modules, the story is made of */
  modules?: Maybe<Array<StoryTextModule>>;
  /** The rating that the user has given to the story. */
  myRating?: Maybe<Scalars['Float']['output']>;
  /** shown in the story preview, the first image of the first artefact of the first story module */
  previewImage?: Maybe<Image>;
  /** story rating with values between 1 and 5. Aggregated to a single value. */
  rating?: Maybe<Scalars['Float']['output']>;
  /** name and or title of the artefact (multi-lingual) */
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StoryConclusionGenerateInput = {
  storyId: Scalars['ID']['input'];
};

export type StoryConclusionInput = {
  conclusion?: InputMaybe<Scalars['String']['input']>;
  storyId: Scalars['ID']['input'];
};

export type StoryConnection = {
  __typename?: 'StoryConnection';
  edges: Array<StoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StoryEdge = {
  __typename?: 'StoryEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Story>;
};

export type StoryInput = {
  artefactId?: InputMaybe<Scalars['ID']['input']>;
  language: Language;
  title: Scalars['String']['input'];
};

export type StoryIntroductionGenerateInput = {
  storyId: Scalars['ID']['input'];
};

export type StoryIntroductionInput = {
  introduction?: InputMaybe<Scalars['String']['input']>;
  storyId: Scalars['ID']['input'];
};

export type StoryModuleThoughtInput = {
  artefactIds: Array<Scalars['ID']['input']>;
  storyId: Scalars['ID']['input'];
  userInput?: Scalars['String']['input'];
};

export type StoryNotificationInput = {
  storyId: Scalars['ID']['input'];
};

export type StoryNotificationUniqueInput = {
  id: Scalars['ID']['input'];
};

export type StoryOrderByInput = {
  createdAt?: InputMaybe<SortDirection>;
  rating?: InputMaybe<SortDirection>;
};

/** Part of a story */
export type StoryTextModule = {
  __typename?: 'StoryTextModule';
  /** artefact collection, minimum one artefact */
  artefacts: Array<Artefact>;
  id: Scalars['String']['output'];
  /** order of the module in the list */
  index: Scalars['Int']['output'];
  /** user thoughts about the artefacts collection, the story part */
  thought?: Maybe<Scalars['String']['output']>;
};

export type StoryUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  language: Language;
};

export type StoryWhereInput = {
  garbage?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<StringFilter>;
};

/** Operator to filter String properties */
export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Operator for _textInput filter */
export type StringSearchFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
};

export type SuggestExploreInput = {
  language: Language;
  limit?: InputMaybe<Scalars['Int']['input']>;
  queryText: Scalars['String']['input'];
};

export type SuggestRelatedArtefactsInput = {
  language: Language;
  storyTitle: Scalars['String']['input'];
};

export enum SuggestType {
  Artefact = 'Artefact',
  Location = 'Location',
  Person = 'Person'
}

export type UrlFilter = {
  contains?: InputMaybe<Scalars['URL']['input']>;
  endsWith?: InputMaybe<Scalars['URL']['input']>;
  equals?: InputMaybe<Scalars['URL']['input']>;
  in?: InputMaybe<Array<Scalars['URL']['input']>>;
  not?: InputMaybe<NestedUrlFilter>;
  notIn?: InputMaybe<Array<Scalars['URL']['input']>>;
  startsWith?: InputMaybe<Scalars['URL']['input']>;
};

export type UpdateArtefactNotificationInput = {
  id: Scalars['String']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateModuleInput = {
  artefactIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  index?: InputMaybe<Scalars['Int']['input']>;
  moduleId: Scalars['ID']['input'];
  storyId: Scalars['ID']['input'];
  thought?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStoryInput = {
  /**  This goes to artefact basket */
  artefactId?: InputMaybe<Array<Scalars['ID']['input']>>;
  licence?: InputMaybe<LicenceType>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  storyID: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStoryNotificationInput = {
  id: Scalars['ID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateUserProfileInput = {
  /** regions the user is interested in */
  continents?: InputMaybe<Array<Continent>>;
  /** grouped four epochs the user is interested in */
  epochs?: InputMaybe<Array<ProfileEpoch>>;
  preferredLanguage: Language;
  username?: InputMaybe<Scalars['String']['input']>;
  /** informational visitor tole (has no functional effect) */
  visitorRole?: InputMaybe<VisitorRole>;
  /** target the user wants to fullfill with the application */
  visitorTarget?: InputMaybe<VisitorTarget>;
  /** user wish / intention / expectation of the application */
  visitorWish?: InputMaybe<VisitorWish>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferred_username?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** user id generated by idp */
  sub: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

/** xCurator specific profile information's */
export type UserProfile = {
  __typename?: 'UserProfile';
  /** regions the user is interested in */
  continents: Array<Continent>;
  /** grouped four epochs the user is interested in */
  epochs: Array<ProfileEpoch>;
  /** artefacts stored as favourites */
  favorites: Array<Artefact>;
  /** preferred user language */
  preferredLanguage: Language;
  username: Scalars['String']['output'];
  /** informational visitor tole (has no functional effect) */
  visitorRole?: Maybe<VisitorRole>;
  /** target the user wants to fulfill with the application */
  visitorTarget?: Maybe<VisitorTarget>;
  /** user wish / intention / expectation of the application */
  visitorWish?: Maybe<VisitorWish>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  User = 'USER'
}

/** ### INPUTS */
export type UserUniqueInput = {
  /** user id, given by the idp provider (e.g. keycloak) */
  sub: Scalars['ID']['input'];
};

export type VerifyEntityInput = {
  /** xCurator Identifier */
  artefactId: Scalars['String']['input'];
  artefactProperty: Scalars['String']['input'];
  entityEndPosition: Scalars['Int']['input'];
  entityStartPosition: Scalars['Int']['input'];
  isCorrect: Scalars['Boolean']['input'];
  language: Language;
};

export enum VisitorRole {
  Curator = 'CURATOR',
  Other = 'OTHER',
  Researcher = 'RESEARCHER',
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Visitor = 'VISITOR'
}

export enum VisitorTarget {
  ContentCreation = 'CONTENT_CREATION',
  FindSomething = 'FIND_SOMETHING',
  Inspiration = 'INSPIRATION',
  LearnSomethingNew = 'LEARN_SOMETHING_NEW'
}

export enum VisitorWish {
  Education = 'EDUCATION',
  Entertainment = 'ENTERTAINMENT',
  Research = 'RESEARCH',
  Work = 'WORK'
}

export type ImageFragment = { __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } };

export type MeFragment = { __typename?: 'User', sub: string, preferred_username?: string | null, name?: string | null, email?: string | null, roles?: Array<string | null> | null };

export type MeErrorFragment = { __typename?: 'AuthError', error: string, error_description: string };

export type MeResponseFragment = { __typename?: 'AuthResponse', user?: { __typename?: 'User', sub: string, preferred_username?: string | null, name?: string | null, email?: string | null, roles?: Array<string | null> | null } | null, error?: { __typename?: 'AuthError', error: string, error_description: string } | null };

export type AddArtefactToBasketMutationVariables = Exact<{
  create: AddArtefactInput;
}>;


export type AddArtefactToBasketMutation = { __typename?: 'Mutation', addArtefactToBasket: { __typename?: 'Story', id: string } };

export type AddToFavouriteMutationVariables = Exact<{
  create: ArtefactFavouriteInput;
}>;


export type AddToFavouriteMutation = { __typename?: 'Mutation', addArtefactToFavourite: string };

export type AuthenticateMutationVariables = Exact<{
  access_token: Scalars['String']['input'];
  refresh_token: Scalars['String']['input'];
  expires_in: Scalars['Int']['input'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'AuthResponse', user?: { __typename?: 'User', sub: string, preferred_username?: string | null, name?: string | null, email?: string | null, roles?: Array<string | null> | null } | null, error?: { __typename?: 'AuthError', error: string, error_description: string } | null } };

export type AuthenticateBlmMutationVariables = Exact<{
  access_token: Scalars['String']['input'];
  refresh_token: Scalars['String']['input'];
  expires_in: Scalars['Int']['input'];
  blmUser: BlmUser;
}>;


export type AuthenticateBlmMutation = { __typename?: 'Mutation', authenticateBLM: { __typename?: 'AuthResponse', user?: { __typename?: 'User', sub: string, preferred_username?: string | null, name?: string | null, email?: string | null, roles?: Array<string | null> | null } | null, error?: { __typename?: 'AuthError', error: string, error_description: string } | null } };

export type CreateModuleMutationVariables = Exact<{
  create: CreateModuleInput;
  language: Language;
}>;


export type CreateModuleMutation = { __typename?: 'Mutation', createModule: { __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> } };

export type CreateStoryMutationVariables = Exact<{
  create: StoryInput;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null } };

export type DeleteArtefactFromFavouriteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteArtefactFromFavouriteMutation = { __typename?: 'Mutation', deleteArtefactFromFavourite: string };

export type DeleteArtefactNotificationMutationVariables = Exact<{
  delete: DeleteArtefactNotificationInput;
}>;


export type DeleteArtefactNotificationMutation = { __typename?: 'Mutation', deleteArtefactNotification?: string | null };

export type DeleteModuleMutationVariables = Exact<{
  delete: DeleteModuleInput;
}>;


export type DeleteModuleMutation = { __typename?: 'Mutation', deleteModule?: string | null };

export type DeleteStoryMutationVariables = Exact<{
  delete: DeleteStoryInput;
}>;


export type DeleteStoryMutation = { __typename?: 'Mutation', deleteStory?: string | null };

export type DeleteProfileMutationVariables = Exact<{
  sub: Scalars['ID']['input'];
}>;


export type DeleteProfileMutation = { __typename?: 'Mutation', deleteUserProfile?: string | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', user?: { __typename?: 'User', sub: string, email?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type PublishStoryMutationVariables = Exact<{
  where: PublishStoryInput;
}>;


export type PublishStoryMutation = { __typename?: 'Mutation', publishStory: { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null } };

export type RateStoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  rating: Scalars['Float']['input'];
}>;


export type RateStoryMutation = { __typename?: 'Mutation', rateStory: number };

export type RemoveArtefactFromBasketMutationVariables = Exact<{
  delete: DeleteArtefactFromBasketInput;
}>;


export type RemoveArtefactFromBasketMutation = { __typename?: 'Mutation', deleteArtefactFromBasket: { __typename?: 'Story', id: string } };

export type ReportArtefactMutationVariables = Exact<{
  create: ArtefactNotificationInput;
}>;


export type ReportArtefactMutation = { __typename?: 'Mutation', reportArtefact: { __typename?: 'ArtefactNotification', id: string } };

export type ReportStoryMutationVariables = Exact<{
  create: StoryNotificationInput;
}>;


export type ReportStoryMutation = { __typename?: 'Mutation', reportStory: { __typename?: 'Notification', id: string } };

export type SetStoryConclusionTemplateMutationVariables = Exact<{
  where: LlmTemplateInput;
}>;


export type SetStoryConclusionTemplateMutation = { __typename?: 'Mutation', setStoryConclusionTemplate: { __typename?: 'LLMTemplate', userTemplate: string, systemTemplate: string } };

export type SetStoryIntroductionTemplateMutationVariables = Exact<{
  where: LlmTemplateInput;
}>;


export type SetStoryIntroductionTemplateMutation = { __typename?: 'Mutation', setStoryIntroductionTemplate: { __typename?: 'LLMTemplate', userTemplate: string, systemTemplate: string } };

export type SetModuleThoughtPromptMutationVariables = Exact<{
  where: LlmTemplateInput;
}>;


export type SetModuleThoughtPromptMutation = { __typename?: 'Mutation', setStoryModulThoughtPrompt: { __typename?: 'LLMTemplate', userTemplate: string, systemTemplate: string } };

export type UnpublishStoryMutationVariables = Exact<{
  where: PublishStoryInput;
}>;


export type UnpublishStoryMutation = { __typename?: 'Mutation', unpublishStory: { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null } };

export type UpdateArtefactNotificationMutationVariables = Exact<{
  update: UpdateArtefactNotificationInput;
}>;


export type UpdateArtefactNotificationMutation = { __typename?: 'Mutation', updateArtefactNotification: { __typename?: 'ArtefactNotification', id: string } };

export type UpdateModuleMutationVariables = Exact<{
  update: UpdateModuleInput;
}>;


export type UpdateModuleMutation = { __typename?: 'Mutation', updateModule: { __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> } };

export type UpdateStoryMutationVariables = Exact<{
  update: UpdateStoryInput;
}>;


export type UpdateStoryMutation = { __typename?: 'Mutation', updateStory: { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null } };

export type UpdateStoryNotificationMutationVariables = Exact<{
  update: UpdateStoryNotificationInput;
}>;


export type UpdateStoryNotificationMutation = { __typename?: 'Mutation', updateStoryNotification: { __typename?: 'Notification', id: string } };

export type UpdateUserProfileMutationVariables = Exact<{
  preferredLanguage: Language;
  continents?: InputMaybe<Array<Continent> | Continent>;
  epochs?: InputMaybe<Array<ProfileEpoch> | ProfileEpoch>;
  visitorRole?: InputMaybe<VisitorRole>;
  visitorTarget?: InputMaybe<VisitorTarget>;
  visitorWish?: InputMaybe<VisitorWish>;
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile?: { __typename?: 'UserProfile', preferredLanguage: Language, continents: Array<Continent>, epochs: Array<ProfileEpoch>, visitorRole?: VisitorRole | null, visitorTarget?: VisitorTarget | null, visitorWish?: VisitorWish | null } | null };

export type VerifyEntityMutationVariables = Exact<{
  artefactId: Scalars['String']['input'];
  artefactProperty: Scalars['String']['input'];
  entityEndPosition: Scalars['Int']['input'];
  entityStartPosition: Scalars['Int']['input'];
  isCorrect: Scalars['Boolean']['input'];
  language: Language;
}>;


export type VerifyEntityMutation = { __typename?: 'Mutation', verifyEntity: { __typename?: 'NamedEntity', endPosition: number, literal: string, property: string, startPosition: number, type: string, linkedData: Array<{ __typename?: 'LinkedDataBySource', source: LinkedDataSource, link: { __typename?: 'LinkedData', id: string, url: string } }> } };

export type GetArtefactQueryVariables = Exact<{
  where: ArtefactUniqueInput;
}>;


export type GetArtefactQuery = { __typename?: 'Query', artefact: { __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, materials: Array<string>, techniques: Array<string>, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }>, dateRange?: { __typename?: 'DateRange', start?: any | null, end?: any | null, literal?: string | null } | null, persons: Array<{ __typename?: 'Person', name: string }>, sourceInfo: { __typename?: 'DataSource', language: Language, collection: string, owner: string, id: string, url?: string | null }, entities: Array<{ __typename?: 'NamedEntity', literal: string, startPosition: number, endPosition: number, type: string, property: string, linkedData: Array<{ __typename?: 'LinkedDataBySource', source: LinkedDataSource, link: { __typename?: 'LinkedData', url: string, id: string } }> }>, locations: Array<{ __typename?: 'Location', countryName?: string | null, lat?: number | null, lon?: number | null, name: string }> } };

export type ArtefactFragment = { __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> };

export type EntityFragment = { __typename?: 'NamedEntity', literal: string, startPosition: number, endPosition: number, type: string, property: string, linkedData: Array<{ __typename?: 'LinkedDataBySource', source: LinkedDataSource, link: { __typename?: 'LinkedData', id: string, url: string } }> };

export type ConclusionTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type ConclusionTemplateQuery = { __typename?: 'Query', conclusionTemplate: { __typename?: 'LLMTemplate', systemTemplate: string, userTemplate: string } };

export type EntitiesDetailQueryVariables = Exact<{
  where: NamedEntityDetailInput;
}>;


export type EntitiesDetailQuery = { __typename?: 'Query', entitiesDetail: { __typename?: 'NamedEntityDetail', description: string, image?: string | null, title: string } };

export type SearchExploreQueryVariables = Exact<{
  where: ExploreSearchInput;
  take: Scalars['Int']['input'];
}>;


export type SearchExploreQuery = { __typename?: 'Query', searchExplore: { __typename?: 'ExploreSearchResult', queryString: string, items: Array<{ __typename?: 'ExploreGridItem', size: { __typename?: 'ExploreItemSize', width: number, height: number }, item: { __typename: 'Artefact', id: string, title: string, images: Array<{ __typename?: 'Image', width: number, height: number, url: string }> } | { __typename: 'Story', id: string, title: string, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null } }>, gridInfo: { __typename?: 'GridInfo', rows: number, columns: number }, bestMatch?: { __typename?: 'ExploreGridItem', size: { __typename?: 'ExploreItemSize', width: number, height: number }, item: { __typename: 'Artefact', id: string, title: string, images: Array<{ __typename?: 'Image', width: number, height: number, url: string }> } | { __typename: 'Story', id: string, title: string, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null } } | null, facette: { __typename?: 'ExploreFacette', colorFacette: Array<{ __typename?: 'ColorFacette', color: ArtefactColor, count: number }>, epochFacette: Array<{ __typename?: 'EpochFacette', epoch: ArtefactEpoch, count: number }>, materialFacette: Array<{ __typename?: 'MaterialFacette', material: Material, count: number }>, sourceFacette: Array<{ __typename?: 'SourceFacette', count: number, owner: ArtefactSourceOwner }>, locationFacette: Array<{ __typename?: 'ContinentFacette', continent: Continent, totalCount: number, countries?: Array<{ __typename?: 'CountryFacette', name: string, count: number }> | null }> } } };

export type ExploreSearchResultFragment = { __typename?: 'ExploreSearchResult', queryString: string, items: Array<{ __typename?: 'ExploreGridItem', size: { __typename?: 'ExploreItemSize', width: number, height: number }, item: { __typename: 'Artefact', id: string, title: string, images: Array<{ __typename?: 'Image', width: number, height: number, url: string }> } | { __typename: 'Story', id: string, title: string, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null } }>, gridInfo: { __typename?: 'GridInfo', rows: number, columns: number }, bestMatch?: { __typename?: 'ExploreGridItem', size: { __typename?: 'ExploreItemSize', width: number, height: number }, item: { __typename: 'Artefact', id: string, title: string, images: Array<{ __typename?: 'Image', width: number, height: number, url: string }> } | { __typename: 'Story', id: string, title: string, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null } } | null, facette: { __typename?: 'ExploreFacette', colorFacette: Array<{ __typename?: 'ColorFacette', color: ArtefactColor, count: number }>, epochFacette: Array<{ __typename?: 'EpochFacette', epoch: ArtefactEpoch, count: number }>, materialFacette: Array<{ __typename?: 'MaterialFacette', material: Material, count: number }>, sourceFacette: Array<{ __typename?: 'SourceFacette', count: number, owner: ArtefactSourceOwner }>, locationFacette: Array<{ __typename?: 'ContinentFacette', continent: Continent, totalCount: number, countries?: Array<{ __typename?: 'CountryFacette', name: string, count: number }> | null }> } };

export type ExploreGridItemFragment = { __typename?: 'ExploreGridItem', size: { __typename?: 'ExploreItemSize', width: number, height: number }, item: { __typename: 'Artefact', id: string, title: string, images: Array<{ __typename?: 'Image', width: number, height: number, url: string }> } | { __typename: 'Story', id: string, title: string, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null } };

export type ExploreArtefactFragment = { __typename?: 'Artefact', id: string, title: string, images: Array<{ __typename?: 'Image', width: number, height: number, url: string }> };

export type ExploreStoryFragment = { __typename?: 'Story', id: string, title: string, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null };

export type ExportProfileMutationVariables = Exact<{
  where: UserUniqueInput;
}>;


export type ExportProfileMutation = { __typename?: 'Mutation', exportProfile: string };

export type FavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoritesQuery = { __typename?: 'Query', profile?: { __typename?: 'UserProfile', favorites: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> } | null };

export type GenerateConclusionQueryVariables = Exact<{
  where: StoryConclusionGenerateInput;
}>;


export type GenerateConclusionQuery = { __typename?: 'Query', generateConclusion: string };

export type GenerateIntroductionQueryVariables = Exact<{
  where: StoryIntroductionGenerateInput;
}>;


export type GenerateIntroductionQuery = { __typename?: 'Query', generateIntroduction: string };

export type GenerateThoughtQueryVariables = Exact<{
  where: StoryModuleThoughtInput;
}>;


export type GenerateThoughtQuery = { __typename?: 'Query', generateThought: string };

export type IntroductionTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type IntroductionTemplateQuery = { __typename?: 'Query', introductionTemplate: { __typename?: 'LLMTemplate', systemTemplate: string, userTemplate: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', sub: string, preferred_username?: string | null, name?: string | null, email?: string | null, roles?: Array<string | null> | null } | null };

export type MyFavouritesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFavouritesQuery = { __typename?: 'Query', myFavourites: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> };

export type MyStoriesQueryVariables = Exact<{
  language: Language;
}>;


export type MyStoriesQuery = { __typename?: 'Query', myStories: Array<{ __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'UserProfile', epochs: Array<ProfileEpoch>, continents: Array<Continent>, visitorRole?: VisitorRole | null, visitorWish?: VisitorWish | null, visitorTarget?: VisitorTarget | null, preferredLanguage: Language, favorites: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> } | null };

export type ProfileFragment = { __typename?: 'UserProfile', epochs: Array<ProfileEpoch>, continents: Array<Continent>, visitorRole?: VisitorRole | null, visitorWish?: VisitorWish | null, visitorTarget?: VisitorTarget | null, preferredLanguage: Language, favorites: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> };

export type RandomStringQueryVariables = Exact<{
  where: LanguageInput;
}>;


export type RandomStringQuery = { __typename?: 'Query', queryString: string };

export type ReportedArtefactQueryVariables = Exact<{
  where: ArtefactNotificationUniqueInput;
  language: Language;
}>;


export type ReportedArtefactQuery = { __typename?: 'Query', reportedArtefact: { __typename?: 'ArtefactNotification', id: string, message: string, isRead: boolean, artefact: { __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } } };

export type ReportedArtefactsQueryVariables = Exact<{
  language: Language;
}>;


export type ReportedArtefactsQuery = { __typename?: 'Query', reportedArtefacts: Array<{ __typename?: 'ArtefactNotification', id: string, message: string, isRead: boolean, artefact: { __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } }> };

export type ReportedStoriesQueryVariables = Exact<{
  language: Language;
}>;


export type ReportedStoriesQuery = { __typename?: 'Query', reportedStories: Array<{ __typename?: 'Notification', id: string, isRead: boolean, story: { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null } }> };

export type ReportedStoryQueryVariables = Exact<{
  where: StoryNotificationUniqueInput;
  language: Language;
}>;


export type ReportedStoryQuery = { __typename?: 'Query', reportedStory: { __typename?: 'Notification', id: string, story: { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null } } };

export type SetConclusionMutationVariables = Exact<{
  where: StoryConclusionInput;
}>;


export type SetConclusionMutation = { __typename?: 'Mutation', setStoryConclusion: { __typename?: 'Story', id: string, conclusion?: string | null } };

export type SetIntroductionMutationVariables = Exact<{
  where: StoryIntroductionInput;
}>;


export type SetIntroductionMutation = { __typename?: 'Mutation', setStoryIntroduction: { __typename?: 'Story', id: string, introduction?: string | null } };

export type GetSimilarArtefactsQueryVariables = Exact<{
  where: ArtefactUniqueInput;
  take: Scalars['Int']['input'];
}>;


export type GetSimilarArtefactsQuery = { __typename?: 'Query', searchSimilarArtefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> };

export type StoriesQueryVariables = Exact<{
  language: Language;
  orderBy?: InputMaybe<StoryOrderByInput>;
}>;


export type StoriesQuery = { __typename?: 'Query', stories: Array<{ __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null }> };

export type StoryQueryVariables = Exact<{
  where: StoryUniqueInput;
}>;


export type StoryQuery = { __typename?: 'Query', story?: { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null } | null };

export type StoryFragment = { __typename?: 'Story', id: string, title: string, introduction?: string | null, conclusion?: string | null, rating?: number | null, language: Language, isPublished: boolean, myRating?: number | null, licence: LicenceType, author: { __typename?: 'User', username: string, sub: string }, previewImage?: { __typename?: 'Image', url: string, width: number, height: number } | null, modules?: Array<{ __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> }> | null, artefactBasket?: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> } | null> | null };

export type ModuleFragment = { __typename?: 'StoryTextModule', id: string, thought?: string | null, index: number, artefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> };

export type PreviewImageFragment = { __typename?: 'Image', url: string, width: number, height: number };

export type SuggestArtefactsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  where: SuggestRelatedArtefactsInput;
}>;


export type SuggestArtefactsQuery = { __typename?: 'Query', suggestRelatedArtefacts: Array<{ __typename?: 'Artefact', id: string, title: string, description?: string | null, keywords: Array<string>, sourceInfo: { __typename?: 'DataSource', url?: string | null, language: Language }, images: Array<{ __typename?: 'Image', url: string, width: number, height: number, licence: { __typename?: 'Licence', name: string, url: string } }>, dateRange?: { __typename?: 'DateRange', literal?: string | null } | null, locations: Array<{ __typename?: 'Location', name: string }>, persons: Array<{ __typename?: 'Person', name: string }>, tags: Array<{ __typename?: 'SearchTag', isUsingAI: boolean, type: SearchTagType, literal: string }> }> };

export type SuggestExploreQueryVariables = Exact<{
  where: SuggestExploreInput;
}>;


export type SuggestExploreQuery = { __typename?: 'Query', suggestExplore?: Array<{ __typename?: 'SearchSuggest', text: string, type: SuggestType }> | null };

export type ThoughtTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type ThoughtTemplateQuery = { __typename?: 'Query', thoughtTemplate: { __typename?: 'LLMTemplate', systemTemplate: string, userTemplate: string } };

export const ImageFragmentDoc = gql`
    fragment Image on Image {
  url
  width
  height
  licence {
    name
    url
  }
}
    `;
export const MeFragmentDoc = gql`
    fragment Me on User {
  sub
  preferred_username
  name
  email
  roles
}
    `;
export const MeErrorFragmentDoc = gql`
    fragment MeError on AuthError {
  error
  error_description
}
    `;
export const MeResponseFragmentDoc = gql`
    fragment MeResponse on AuthResponse {
  user {
    ...Me
  }
  error {
    ...MeError
  }
}
    ${MeFragmentDoc}
${MeErrorFragmentDoc}`;
export const EntityFragmentDoc = gql`
    fragment Entity on NamedEntity {
  literal
  startPosition
  endPosition
  type
  property
  linkedData {
    link {
      id
      url
    }
    source
  }
}
    `;
export const ExploreArtefactFragmentDoc = gql`
    fragment ExploreArtefact on Artefact {
  id
  title
  images {
    width
    height
    url
  }
}
    `;
export const ExploreStoryFragmentDoc = gql`
    fragment ExploreStory on Story {
  id
  title
  previewImage {
    url
    width
    height
  }
}
    `;
export const ExploreGridItemFragmentDoc = gql`
    fragment ExploreGridItem on ExploreGridItem {
  size {
    width
    height
  }
  item {
    __typename
    ... on Artefact {
      ...ExploreArtefact
    }
    ... on Story {
      ...ExploreStory
    }
  }
}
    ${ExploreArtefactFragmentDoc}
${ExploreStoryFragmentDoc}`;
export const ExploreSearchResultFragmentDoc = gql`
    fragment ExploreSearchResult on ExploreSearchResult {
  queryString
  items {
    ...ExploreGridItem
  }
  gridInfo {
    rows
    columns
  }
  bestMatch {
    ...ExploreGridItem
  }
  facette {
    colorFacette {
      color
      count
    }
    epochFacette {
      epoch
      count
    }
    materialFacette {
      material
      count
    }
    sourceFacette {
      count
      owner
    }
    locationFacette {
      continent
      countries {
        name
        count
      }
      totalCount
    }
  }
}
    ${ExploreGridItemFragmentDoc}`;
export const ArtefactFragmentDoc = gql`
    fragment Artefact on Artefact {
  id
  title
  description
  keywords
  sourceInfo {
    url
    language
  }
  images {
    url
    width
    height
    licence {
      name
      url
    }
  }
  dateRange {
    literal
  }
  locations {
    name
  }
  persons {
    name
  }
  tags {
    isUsingAI
    type
    literal
  }
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on UserProfile {
  epochs
  continents
  visitorRole
  visitorWish
  visitorTarget
  preferredLanguage
  favorites {
    ...Artefact
  }
}
    ${ArtefactFragmentDoc}`;
export const PreviewImageFragmentDoc = gql`
    fragment PreviewImage on Image {
  url
  width
  height
}
    `;
export const ModuleFragmentDoc = gql`
    fragment Module on StoryTextModule {
  id
  thought
  index
  artefacts {
    ...Artefact
  }
}
    ${ArtefactFragmentDoc}`;
export const StoryFragmentDoc = gql`
    fragment Story on Story {
  id
  title
  introduction
  conclusion
  rating
  language
  isPublished
  myRating
  author {
    username
    sub
  }
  previewImage {
    ...PreviewImage
  }
  modules {
    ...Module
  }
  artefactBasket {
    ...Artefact
  }
  licence
}
    ${PreviewImageFragmentDoc}
${ModuleFragmentDoc}
${ArtefactFragmentDoc}`;
export const AddArtefactToBasketDocument = gql`
    mutation AddArtefactToBasket($create: AddArtefactInput!) {
  addArtefactToBasket(create: $create) {
    id
  }
}
    `;
export type AddArtefactToBasketMutationFn = Apollo.MutationFunction<AddArtefactToBasketMutation, AddArtefactToBasketMutationVariables>;

/**
 * __useAddArtefactToBasketMutation__
 *
 * To run a mutation, you first call `useAddArtefactToBasketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddArtefactToBasketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addArtefactToBasketMutation, { data, loading, error }] = useAddArtefactToBasketMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useAddArtefactToBasketMutation(baseOptions?: Apollo.MutationHookOptions<AddArtefactToBasketMutation, AddArtefactToBasketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddArtefactToBasketMutation, AddArtefactToBasketMutationVariables>(AddArtefactToBasketDocument, options);
      }
export type AddArtefactToBasketMutationHookResult = ReturnType<typeof useAddArtefactToBasketMutation>;
export type AddArtefactToBasketMutationResult = Apollo.MutationResult<AddArtefactToBasketMutation>;
export type AddArtefactToBasketMutationOptions = Apollo.BaseMutationOptions<AddArtefactToBasketMutation, AddArtefactToBasketMutationVariables>;
export const AddToFavouriteDocument = gql`
    mutation addToFavourite($create: ArtefactFavouriteInput!) {
  addArtefactToFavourite(create: $create)
}
    `;
export type AddToFavouriteMutationFn = Apollo.MutationFunction<AddToFavouriteMutation, AddToFavouriteMutationVariables>;

/**
 * __useAddToFavouriteMutation__
 *
 * To run a mutation, you first call `useAddToFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToFavouriteMutation, { data, loading, error }] = useAddToFavouriteMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useAddToFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<AddToFavouriteMutation, AddToFavouriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToFavouriteMutation, AddToFavouriteMutationVariables>(AddToFavouriteDocument, options);
      }
export type AddToFavouriteMutationHookResult = ReturnType<typeof useAddToFavouriteMutation>;
export type AddToFavouriteMutationResult = Apollo.MutationResult<AddToFavouriteMutation>;
export type AddToFavouriteMutationOptions = Apollo.BaseMutationOptions<AddToFavouriteMutation, AddToFavouriteMutationVariables>;
export const AuthenticateDocument = gql`
    mutation Authenticate($access_token: String!, $refresh_token: String!, $expires_in: Int!) {
  authenticate(
    access_token: $access_token
    refresh_token: $refresh_token
    expires_in: $expires_in
  ) {
    ...MeResponse
  }
}
    ${MeResponseFragmentDoc}`;
export type AuthenticateMutationFn = Apollo.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      access_token: // value for 'access_token'
 *      refresh_token: // value for 'refresh_token'
 *      expires_in: // value for 'expires_in'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, options);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;
export const AuthenticateBlmDocument = gql`
    mutation AuthenticateBLM($access_token: String!, $refresh_token: String!, $expires_in: Int!, $blmUser: BLMUser!) {
  authenticateBLM(
    access_token: $access_token
    refresh_token: $refresh_token
    expires_in: $expires_in
    blmUser: $blmUser
  ) {
    ...MeResponse
  }
}
    ${MeResponseFragmentDoc}`;
export type AuthenticateBlmMutationFn = Apollo.MutationFunction<AuthenticateBlmMutation, AuthenticateBlmMutationVariables>;

/**
 * __useAuthenticateBlmMutation__
 *
 * To run a mutation, you first call `useAuthenticateBlmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateBlmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateBlmMutation, { data, loading, error }] = useAuthenticateBlmMutation({
 *   variables: {
 *      access_token: // value for 'access_token'
 *      refresh_token: // value for 'refresh_token'
 *      expires_in: // value for 'expires_in'
 *      blmUser: // value for 'blmUser'
 *   },
 * });
 */
export function useAuthenticateBlmMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateBlmMutation, AuthenticateBlmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateBlmMutation, AuthenticateBlmMutationVariables>(AuthenticateBlmDocument, options);
      }
export type AuthenticateBlmMutationHookResult = ReturnType<typeof useAuthenticateBlmMutation>;
export type AuthenticateBlmMutationResult = Apollo.MutationResult<AuthenticateBlmMutation>;
export type AuthenticateBlmMutationOptions = Apollo.BaseMutationOptions<AuthenticateBlmMutation, AuthenticateBlmMutationVariables>;
export const CreateModuleDocument = gql`
    mutation CreateModule($create: CreateModuleInput!, $language: Language!) {
  createModule(create: $create, language: $language) {
    ...Module
  }
}
    ${ModuleFragmentDoc}`;
export type CreateModuleMutationFn = Apollo.MutationFunction<CreateModuleMutation, CreateModuleMutationVariables>;

/**
 * __useCreateModuleMutation__
 *
 * To run a mutation, you first call `useCreateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModuleMutation, { data, loading, error }] = useCreateModuleMutation({
 *   variables: {
 *      create: // value for 'create'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCreateModuleMutation(baseOptions?: Apollo.MutationHookOptions<CreateModuleMutation, CreateModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModuleMutation, CreateModuleMutationVariables>(CreateModuleDocument, options);
      }
export type CreateModuleMutationHookResult = ReturnType<typeof useCreateModuleMutation>;
export type CreateModuleMutationResult = Apollo.MutationResult<CreateModuleMutation>;
export type CreateModuleMutationOptions = Apollo.BaseMutationOptions<CreateModuleMutation, CreateModuleMutationVariables>;
export const CreateStoryDocument = gql`
    mutation CreateStory($create: StoryInput!) {
  createStory(create: $create) {
    ...Story
  }
}
    ${StoryFragmentDoc}`;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, options);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const DeleteArtefactFromFavouriteDocument = gql`
    mutation deleteArtefactFromFavourite($id: ID!) {
  deleteArtefactFromFavourite(delete: {id: $id})
}
    `;
export type DeleteArtefactFromFavouriteMutationFn = Apollo.MutationFunction<DeleteArtefactFromFavouriteMutation, DeleteArtefactFromFavouriteMutationVariables>;

/**
 * __useDeleteArtefactFromFavouriteMutation__
 *
 * To run a mutation, you first call `useDeleteArtefactFromFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArtefactFromFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArtefactFromFavouriteMutation, { data, loading, error }] = useDeleteArtefactFromFavouriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArtefactFromFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArtefactFromFavouriteMutation, DeleteArtefactFromFavouriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArtefactFromFavouriteMutation, DeleteArtefactFromFavouriteMutationVariables>(DeleteArtefactFromFavouriteDocument, options);
      }
export type DeleteArtefactFromFavouriteMutationHookResult = ReturnType<typeof useDeleteArtefactFromFavouriteMutation>;
export type DeleteArtefactFromFavouriteMutationResult = Apollo.MutationResult<DeleteArtefactFromFavouriteMutation>;
export type DeleteArtefactFromFavouriteMutationOptions = Apollo.BaseMutationOptions<DeleteArtefactFromFavouriteMutation, DeleteArtefactFromFavouriteMutationVariables>;
export const DeleteArtefactNotificationDocument = gql`
    mutation DeleteArtefactNotification($delete: DeleteArtefactNotificationInput!) {
  deleteArtefactNotification(delete: $delete)
}
    `;
export type DeleteArtefactNotificationMutationFn = Apollo.MutationFunction<DeleteArtefactNotificationMutation, DeleteArtefactNotificationMutationVariables>;

/**
 * __useDeleteArtefactNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteArtefactNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArtefactNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArtefactNotificationMutation, { data, loading, error }] = useDeleteArtefactNotificationMutation({
 *   variables: {
 *      delete: // value for 'delete'
 *   },
 * });
 */
export function useDeleteArtefactNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArtefactNotificationMutation, DeleteArtefactNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArtefactNotificationMutation, DeleteArtefactNotificationMutationVariables>(DeleteArtefactNotificationDocument, options);
      }
export type DeleteArtefactNotificationMutationHookResult = ReturnType<typeof useDeleteArtefactNotificationMutation>;
export type DeleteArtefactNotificationMutationResult = Apollo.MutationResult<DeleteArtefactNotificationMutation>;
export type DeleteArtefactNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteArtefactNotificationMutation, DeleteArtefactNotificationMutationVariables>;
export const DeleteModuleDocument = gql`
    mutation DeleteModule($delete: DeleteModuleInput!) {
  deleteModule(delete: $delete)
}
    `;
export type DeleteModuleMutationFn = Apollo.MutationFunction<DeleteModuleMutation, DeleteModuleMutationVariables>;

/**
 * __useDeleteModuleMutation__
 *
 * To run a mutation, you first call `useDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModuleMutation, { data, loading, error }] = useDeleteModuleMutation({
 *   variables: {
 *      delete: // value for 'delete'
 *   },
 * });
 */
export function useDeleteModuleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModuleMutation, DeleteModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteModuleMutation, DeleteModuleMutationVariables>(DeleteModuleDocument, options);
      }
export type DeleteModuleMutationHookResult = ReturnType<typeof useDeleteModuleMutation>;
export type DeleteModuleMutationResult = Apollo.MutationResult<DeleteModuleMutation>;
export type DeleteModuleMutationOptions = Apollo.BaseMutationOptions<DeleteModuleMutation, DeleteModuleMutationVariables>;
export const DeleteStoryDocument = gql`
    mutation DeleteStory($delete: DeleteStoryInput!) {
  deleteStory(delete: $delete)
}
    `;
export type DeleteStoryMutationFn = Apollo.MutationFunction<DeleteStoryMutation, DeleteStoryMutationVariables>;

/**
 * __useDeleteStoryMutation__
 *
 * To run a mutation, you first call `useDeleteStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStoryMutation, { data, loading, error }] = useDeleteStoryMutation({
 *   variables: {
 *      delete: // value for 'delete'
 *   },
 * });
 */
export function useDeleteStoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStoryMutation, DeleteStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStoryMutation, DeleteStoryMutationVariables>(DeleteStoryDocument, options);
      }
export type DeleteStoryMutationHookResult = ReturnType<typeof useDeleteStoryMutation>;
export type DeleteStoryMutationResult = Apollo.MutationResult<DeleteStoryMutation>;
export type DeleteStoryMutationOptions = Apollo.BaseMutationOptions<DeleteStoryMutation, DeleteStoryMutationVariables>;
export const DeleteProfileDocument = gql`
    mutation DeleteProfile($sub: ID!) {
  deleteUserProfile(delete: {sub: $sub})
}
    `;
export type DeleteProfileMutationFn = Apollo.MutationFunction<DeleteProfileMutation, DeleteProfileMutationVariables>;

/**
 * __useDeleteProfileMutation__
 *
 * To run a mutation, you first call `useDeleteProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProfileMutation, { data, loading, error }] = useDeleteProfileMutation({
 *   variables: {
 *      sub: // value for 'sub'
 *   },
 * });
 */
export function useDeleteProfileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProfileMutation, DeleteProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProfileMutation, DeleteProfileMutationVariables>(DeleteProfileDocument, options);
      }
export type DeleteProfileMutationHookResult = ReturnType<typeof useDeleteProfileMutation>;
export type DeleteProfileMutationResult = Apollo.MutationResult<DeleteProfileMutation>;
export type DeleteProfileMutationOptions = Apollo.BaseMutationOptions<DeleteProfileMutation, DeleteProfileMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      sub
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const PublishStoryDocument = gql`
    mutation PublishStory($where: PublishStoryInput!) {
  publishStory(where: $where) {
    ...Story
  }
}
    ${StoryFragmentDoc}`;
export type PublishStoryMutationFn = Apollo.MutationFunction<PublishStoryMutation, PublishStoryMutationVariables>;

/**
 * __usePublishStoryMutation__
 *
 * To run a mutation, you first call `usePublishStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishStoryMutation, { data, loading, error }] = usePublishStoryMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePublishStoryMutation(baseOptions?: Apollo.MutationHookOptions<PublishStoryMutation, PublishStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishStoryMutation, PublishStoryMutationVariables>(PublishStoryDocument, options);
      }
export type PublishStoryMutationHookResult = ReturnType<typeof usePublishStoryMutation>;
export type PublishStoryMutationResult = Apollo.MutationResult<PublishStoryMutation>;
export type PublishStoryMutationOptions = Apollo.BaseMutationOptions<PublishStoryMutation, PublishStoryMutationVariables>;
export const RateStoryDocument = gql`
    mutation rateStory($id: ID!, $rating: Float!) {
  rateStory(where: {id: $id, rating: $rating})
}
    `;
export type RateStoryMutationFn = Apollo.MutationFunction<RateStoryMutation, RateStoryMutationVariables>;

/**
 * __useRateStoryMutation__
 *
 * To run a mutation, you first call `useRateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateStoryMutation, { data, loading, error }] = useRateStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useRateStoryMutation(baseOptions?: Apollo.MutationHookOptions<RateStoryMutation, RateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateStoryMutation, RateStoryMutationVariables>(RateStoryDocument, options);
      }
export type RateStoryMutationHookResult = ReturnType<typeof useRateStoryMutation>;
export type RateStoryMutationResult = Apollo.MutationResult<RateStoryMutation>;
export type RateStoryMutationOptions = Apollo.BaseMutationOptions<RateStoryMutation, RateStoryMutationVariables>;
export const RemoveArtefactFromBasketDocument = gql`
    mutation RemoveArtefactFromBasket($delete: DeleteArtefactFromBasketInput!) {
  deleteArtefactFromBasket(delete: $delete) {
    id
  }
}
    `;
export type RemoveArtefactFromBasketMutationFn = Apollo.MutationFunction<RemoveArtefactFromBasketMutation, RemoveArtefactFromBasketMutationVariables>;

/**
 * __useRemoveArtefactFromBasketMutation__
 *
 * To run a mutation, you first call `useRemoveArtefactFromBasketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveArtefactFromBasketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeArtefactFromBasketMutation, { data, loading, error }] = useRemoveArtefactFromBasketMutation({
 *   variables: {
 *      delete: // value for 'delete'
 *   },
 * });
 */
export function useRemoveArtefactFromBasketMutation(baseOptions?: Apollo.MutationHookOptions<RemoveArtefactFromBasketMutation, RemoveArtefactFromBasketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveArtefactFromBasketMutation, RemoveArtefactFromBasketMutationVariables>(RemoveArtefactFromBasketDocument, options);
      }
export type RemoveArtefactFromBasketMutationHookResult = ReturnType<typeof useRemoveArtefactFromBasketMutation>;
export type RemoveArtefactFromBasketMutationResult = Apollo.MutationResult<RemoveArtefactFromBasketMutation>;
export type RemoveArtefactFromBasketMutationOptions = Apollo.BaseMutationOptions<RemoveArtefactFromBasketMutation, RemoveArtefactFromBasketMutationVariables>;
export const ReportArtefactDocument = gql`
    mutation ReportArtefact($create: ArtefactNotificationInput!) {
  reportArtefact(create: $create) {
    id
  }
}
    `;
export type ReportArtefactMutationFn = Apollo.MutationFunction<ReportArtefactMutation, ReportArtefactMutationVariables>;

/**
 * __useReportArtefactMutation__
 *
 * To run a mutation, you first call `useReportArtefactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportArtefactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportArtefactMutation, { data, loading, error }] = useReportArtefactMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useReportArtefactMutation(baseOptions?: Apollo.MutationHookOptions<ReportArtefactMutation, ReportArtefactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportArtefactMutation, ReportArtefactMutationVariables>(ReportArtefactDocument, options);
      }
export type ReportArtefactMutationHookResult = ReturnType<typeof useReportArtefactMutation>;
export type ReportArtefactMutationResult = Apollo.MutationResult<ReportArtefactMutation>;
export type ReportArtefactMutationOptions = Apollo.BaseMutationOptions<ReportArtefactMutation, ReportArtefactMutationVariables>;
export const ReportStoryDocument = gql`
    mutation ReportStory($create: StoryNotificationInput!) {
  reportStory(create: $create) {
    id
  }
}
    `;
export type ReportStoryMutationFn = Apollo.MutationFunction<ReportStoryMutation, ReportStoryMutationVariables>;

/**
 * __useReportStoryMutation__
 *
 * To run a mutation, you first call `useReportStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportStoryMutation, { data, loading, error }] = useReportStoryMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useReportStoryMutation(baseOptions?: Apollo.MutationHookOptions<ReportStoryMutation, ReportStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportStoryMutation, ReportStoryMutationVariables>(ReportStoryDocument, options);
      }
export type ReportStoryMutationHookResult = ReturnType<typeof useReportStoryMutation>;
export type ReportStoryMutationResult = Apollo.MutationResult<ReportStoryMutation>;
export type ReportStoryMutationOptions = Apollo.BaseMutationOptions<ReportStoryMutation, ReportStoryMutationVariables>;
export const SetStoryConclusionTemplateDocument = gql`
    mutation SetStoryConclusionTemplate($where: LLMTemplateInput!) {
  setStoryConclusionTemplate(where: $where) {
    userTemplate
    systemTemplate
  }
}
    `;
export type SetStoryConclusionTemplateMutationFn = Apollo.MutationFunction<SetStoryConclusionTemplateMutation, SetStoryConclusionTemplateMutationVariables>;

/**
 * __useSetStoryConclusionTemplateMutation__
 *
 * To run a mutation, you first call `useSetStoryConclusionTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStoryConclusionTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStoryConclusionTemplateMutation, { data, loading, error }] = useSetStoryConclusionTemplateMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSetStoryConclusionTemplateMutation(baseOptions?: Apollo.MutationHookOptions<SetStoryConclusionTemplateMutation, SetStoryConclusionTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetStoryConclusionTemplateMutation, SetStoryConclusionTemplateMutationVariables>(SetStoryConclusionTemplateDocument, options);
      }
export type SetStoryConclusionTemplateMutationHookResult = ReturnType<typeof useSetStoryConclusionTemplateMutation>;
export type SetStoryConclusionTemplateMutationResult = Apollo.MutationResult<SetStoryConclusionTemplateMutation>;
export type SetStoryConclusionTemplateMutationOptions = Apollo.BaseMutationOptions<SetStoryConclusionTemplateMutation, SetStoryConclusionTemplateMutationVariables>;
export const SetStoryIntroductionTemplateDocument = gql`
    mutation setStoryIntroductionTemplate($where: LLMTemplateInput!) {
  setStoryIntroductionTemplate(where: $where) {
    userTemplate
    systemTemplate
  }
}
    `;
export type SetStoryIntroductionTemplateMutationFn = Apollo.MutationFunction<SetStoryIntroductionTemplateMutation, SetStoryIntroductionTemplateMutationVariables>;

/**
 * __useSetStoryIntroductionTemplateMutation__
 *
 * To run a mutation, you first call `useSetStoryIntroductionTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStoryIntroductionTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStoryIntroductionTemplateMutation, { data, loading, error }] = useSetStoryIntroductionTemplateMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSetStoryIntroductionTemplateMutation(baseOptions?: Apollo.MutationHookOptions<SetStoryIntroductionTemplateMutation, SetStoryIntroductionTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetStoryIntroductionTemplateMutation, SetStoryIntroductionTemplateMutationVariables>(SetStoryIntroductionTemplateDocument, options);
      }
export type SetStoryIntroductionTemplateMutationHookResult = ReturnType<typeof useSetStoryIntroductionTemplateMutation>;
export type SetStoryIntroductionTemplateMutationResult = Apollo.MutationResult<SetStoryIntroductionTemplateMutation>;
export type SetStoryIntroductionTemplateMutationOptions = Apollo.BaseMutationOptions<SetStoryIntroductionTemplateMutation, SetStoryIntroductionTemplateMutationVariables>;
export const SetModuleThoughtPromptDocument = gql`
    mutation SetModuleThoughtPrompt($where: LLMTemplateInput!) {
  setStoryModulThoughtPrompt(where: $where) {
    userTemplate
    systemTemplate
  }
}
    `;
export type SetModuleThoughtPromptMutationFn = Apollo.MutationFunction<SetModuleThoughtPromptMutation, SetModuleThoughtPromptMutationVariables>;

/**
 * __useSetModuleThoughtPromptMutation__
 *
 * To run a mutation, you first call `useSetModuleThoughtPromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetModuleThoughtPromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setModuleThoughtPromptMutation, { data, loading, error }] = useSetModuleThoughtPromptMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSetModuleThoughtPromptMutation(baseOptions?: Apollo.MutationHookOptions<SetModuleThoughtPromptMutation, SetModuleThoughtPromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetModuleThoughtPromptMutation, SetModuleThoughtPromptMutationVariables>(SetModuleThoughtPromptDocument, options);
      }
export type SetModuleThoughtPromptMutationHookResult = ReturnType<typeof useSetModuleThoughtPromptMutation>;
export type SetModuleThoughtPromptMutationResult = Apollo.MutationResult<SetModuleThoughtPromptMutation>;
export type SetModuleThoughtPromptMutationOptions = Apollo.BaseMutationOptions<SetModuleThoughtPromptMutation, SetModuleThoughtPromptMutationVariables>;
export const UnpublishStoryDocument = gql`
    mutation UnpublishStory($where: PublishStoryInput!) {
  unpublishStory(where: $where) {
    ...Story
  }
}
    ${StoryFragmentDoc}`;
export type UnpublishStoryMutationFn = Apollo.MutationFunction<UnpublishStoryMutation, UnpublishStoryMutationVariables>;

/**
 * __useUnpublishStoryMutation__
 *
 * To run a mutation, you first call `useUnpublishStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishStoryMutation, { data, loading, error }] = useUnpublishStoryMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUnpublishStoryMutation(baseOptions?: Apollo.MutationHookOptions<UnpublishStoryMutation, UnpublishStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnpublishStoryMutation, UnpublishStoryMutationVariables>(UnpublishStoryDocument, options);
      }
export type UnpublishStoryMutationHookResult = ReturnType<typeof useUnpublishStoryMutation>;
export type UnpublishStoryMutationResult = Apollo.MutationResult<UnpublishStoryMutation>;
export type UnpublishStoryMutationOptions = Apollo.BaseMutationOptions<UnpublishStoryMutation, UnpublishStoryMutationVariables>;
export const UpdateArtefactNotificationDocument = gql`
    mutation UpdateArtefactNotification($update: UpdateArtefactNotificationInput!) {
  updateArtefactNotification(update: $update) {
    id
  }
}
    `;
export type UpdateArtefactNotificationMutationFn = Apollo.MutationFunction<UpdateArtefactNotificationMutation, UpdateArtefactNotificationMutationVariables>;

/**
 * __useUpdateArtefactNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateArtefactNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArtefactNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArtefactNotificationMutation, { data, loading, error }] = useUpdateArtefactNotificationMutation({
 *   variables: {
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateArtefactNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArtefactNotificationMutation, UpdateArtefactNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArtefactNotificationMutation, UpdateArtefactNotificationMutationVariables>(UpdateArtefactNotificationDocument, options);
      }
export type UpdateArtefactNotificationMutationHookResult = ReturnType<typeof useUpdateArtefactNotificationMutation>;
export type UpdateArtefactNotificationMutationResult = Apollo.MutationResult<UpdateArtefactNotificationMutation>;
export type UpdateArtefactNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateArtefactNotificationMutation, UpdateArtefactNotificationMutationVariables>;
export const UpdateModuleDocument = gql`
    mutation UpdateModule($update: UpdateModuleInput!) {
  updateModule(update: $update) {
    ...Module
  }
}
    ${ModuleFragmentDoc}`;
export type UpdateModuleMutationFn = Apollo.MutationFunction<UpdateModuleMutation, UpdateModuleMutationVariables>;

/**
 * __useUpdateModuleMutation__
 *
 * To run a mutation, you first call `useUpdateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModuleMutation, { data, loading, error }] = useUpdateModuleMutation({
 *   variables: {
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateModuleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModuleMutation, UpdateModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModuleMutation, UpdateModuleMutationVariables>(UpdateModuleDocument, options);
      }
export type UpdateModuleMutationHookResult = ReturnType<typeof useUpdateModuleMutation>;
export type UpdateModuleMutationResult = Apollo.MutationResult<UpdateModuleMutation>;
export type UpdateModuleMutationOptions = Apollo.BaseMutationOptions<UpdateModuleMutation, UpdateModuleMutationVariables>;
export const UpdateStoryDocument = gql`
    mutation UpdateStory($update: UpdateStoryInput!) {
  updateStory(update: $update) {
    ...Story
  }
}
    ${StoryFragmentDoc}`;
export type UpdateStoryMutationFn = Apollo.MutationFunction<UpdateStoryMutation, UpdateStoryMutationVariables>;

/**
 * __useUpdateStoryMutation__
 *
 * To run a mutation, you first call `useUpdateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryMutation, { data, loading, error }] = useUpdateStoryMutation({
 *   variables: {
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateStoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryMutation, UpdateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryMutation, UpdateStoryMutationVariables>(UpdateStoryDocument, options);
      }
export type UpdateStoryMutationHookResult = ReturnType<typeof useUpdateStoryMutation>;
export type UpdateStoryMutationResult = Apollo.MutationResult<UpdateStoryMutation>;
export type UpdateStoryMutationOptions = Apollo.BaseMutationOptions<UpdateStoryMutation, UpdateStoryMutationVariables>;
export const UpdateStoryNotificationDocument = gql`
    mutation UpdateStoryNotification($update: UpdateStoryNotificationInput!) {
  updateStoryNotification(update: $update) {
    id
  }
}
    `;
export type UpdateStoryNotificationMutationFn = Apollo.MutationFunction<UpdateStoryNotificationMutation, UpdateStoryNotificationMutationVariables>;

/**
 * __useUpdateStoryNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateStoryNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryNotificationMutation, { data, loading, error }] = useUpdateStoryNotificationMutation({
 *   variables: {
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateStoryNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryNotificationMutation, UpdateStoryNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryNotificationMutation, UpdateStoryNotificationMutationVariables>(UpdateStoryNotificationDocument, options);
      }
export type UpdateStoryNotificationMutationHookResult = ReturnType<typeof useUpdateStoryNotificationMutation>;
export type UpdateStoryNotificationMutationResult = Apollo.MutationResult<UpdateStoryNotificationMutation>;
export type UpdateStoryNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateStoryNotificationMutation, UpdateStoryNotificationMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($preferredLanguage: Language!, $continents: [Continent!], $epochs: [ProfileEpoch!], $visitorRole: VisitorRole, $visitorTarget: VisitorTarget, $visitorWish: VisitorWish, $username: String) {
  updateUserProfile(
    update: {preferredLanguage: $preferredLanguage, continents: $continents, epochs: $epochs, visitorRole: $visitorRole, visitorTarget: $visitorTarget, visitorWish: $visitorWish, username: $username}
  ) {
    preferredLanguage
    continents
    epochs
    visitorRole
    visitorTarget
    visitorWish
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      preferredLanguage: // value for 'preferredLanguage'
 *      continents: // value for 'continents'
 *      epochs: // value for 'epochs'
 *      visitorRole: // value for 'visitorRole'
 *      visitorTarget: // value for 'visitorTarget'
 *      visitorWish: // value for 'visitorWish'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const VerifyEntityDocument = gql`
    mutation verifyEntity($artefactId: String!, $artefactProperty: String!, $entityEndPosition: Int!, $entityStartPosition: Int!, $isCorrect: Boolean!, $language: Language!) {
  verifyEntity(
    where: {artefactId: $artefactId, artefactProperty: $artefactProperty, entityEndPosition: $entityEndPosition, entityStartPosition: $entityStartPosition, isCorrect: $isCorrect, language: $language}
  ) {
    endPosition
    linkedData {
      link {
        id
        url
      }
      source
    }
    literal
    property
    startPosition
    type
  }
}
    `;
export type VerifyEntityMutationFn = Apollo.MutationFunction<VerifyEntityMutation, VerifyEntityMutationVariables>;

/**
 * __useVerifyEntityMutation__
 *
 * To run a mutation, you first call `useVerifyEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEntityMutation, { data, loading, error }] = useVerifyEntityMutation({
 *   variables: {
 *      artefactId: // value for 'artefactId'
 *      artefactProperty: // value for 'artefactProperty'
 *      entityEndPosition: // value for 'entityEndPosition'
 *      entityStartPosition: // value for 'entityStartPosition'
 *      isCorrect: // value for 'isCorrect'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useVerifyEntityMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEntityMutation, VerifyEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEntityMutation, VerifyEntityMutationVariables>(VerifyEntityDocument, options);
      }
export type VerifyEntityMutationHookResult = ReturnType<typeof useVerifyEntityMutation>;
export type VerifyEntityMutationResult = Apollo.MutationResult<VerifyEntityMutation>;
export type VerifyEntityMutationOptions = Apollo.BaseMutationOptions<VerifyEntityMutation, VerifyEntityMutationVariables>;
export const GetArtefactDocument = gql`
    query GetArtefact($where: ArtefactUniqueInput!) {
  artefact(where: $where) {
    id
    images {
      ...Image
    }
    tags {
      isUsingAI
      type
      literal
    }
    title
    dateRange {
      start
      end
      literal
    }
    description
    keywords
    persons {
      name
    }
    sourceInfo {
      language
      collection
      owner
      id
      url
    }
    entities {
      ...Entity
    }
    materials
    techniques
    locations {
      countryName
      lat
      lon
      name
    }
    entities {
      linkedData {
        link {
          url
        }
      }
    }
  }
}
    ${ImageFragmentDoc}
${EntityFragmentDoc}`;

/**
 * __useGetArtefactQuery__
 *
 * To run a query within a React component, call `useGetArtefactQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtefactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtefactQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetArtefactQuery(baseOptions: Apollo.QueryHookOptions<GetArtefactQuery, GetArtefactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArtefactQuery, GetArtefactQueryVariables>(GetArtefactDocument, options);
      }
export function useGetArtefactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArtefactQuery, GetArtefactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArtefactQuery, GetArtefactQueryVariables>(GetArtefactDocument, options);
        }
export type GetArtefactQueryHookResult = ReturnType<typeof useGetArtefactQuery>;
export type GetArtefactLazyQueryHookResult = ReturnType<typeof useGetArtefactLazyQuery>;
export type GetArtefactQueryResult = Apollo.QueryResult<GetArtefactQuery, GetArtefactQueryVariables>;
export const ConclusionTemplateDocument = gql`
    query ConclusionTemplate {
  conclusionTemplate {
    systemTemplate
    userTemplate
  }
}
    `;

/**
 * __useConclusionTemplateQuery__
 *
 * To run a query within a React component, call `useConclusionTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useConclusionTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConclusionTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useConclusionTemplateQuery(baseOptions?: Apollo.QueryHookOptions<ConclusionTemplateQuery, ConclusionTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConclusionTemplateQuery, ConclusionTemplateQueryVariables>(ConclusionTemplateDocument, options);
      }
export function useConclusionTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConclusionTemplateQuery, ConclusionTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConclusionTemplateQuery, ConclusionTemplateQueryVariables>(ConclusionTemplateDocument, options);
        }
export type ConclusionTemplateQueryHookResult = ReturnType<typeof useConclusionTemplateQuery>;
export type ConclusionTemplateLazyQueryHookResult = ReturnType<typeof useConclusionTemplateLazyQuery>;
export type ConclusionTemplateQueryResult = Apollo.QueryResult<ConclusionTemplateQuery, ConclusionTemplateQueryVariables>;
export const EntitiesDetailDocument = gql`
    query EntitiesDetail($where: NamedEntityDetailInput!) {
  entitiesDetail(where: $where) {
    description
    image
    title
  }
}
    `;

/**
 * __useEntitiesDetailQuery__
 *
 * To run a query within a React component, call `useEntitiesDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntitiesDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntitiesDetailQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEntitiesDetailQuery(baseOptions: Apollo.QueryHookOptions<EntitiesDetailQuery, EntitiesDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntitiesDetailQuery, EntitiesDetailQueryVariables>(EntitiesDetailDocument, options);
      }
export function useEntitiesDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntitiesDetailQuery, EntitiesDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntitiesDetailQuery, EntitiesDetailQueryVariables>(EntitiesDetailDocument, options);
        }
export type EntitiesDetailQueryHookResult = ReturnType<typeof useEntitiesDetailQuery>;
export type EntitiesDetailLazyQueryHookResult = ReturnType<typeof useEntitiesDetailLazyQuery>;
export type EntitiesDetailQueryResult = Apollo.QueryResult<EntitiesDetailQuery, EntitiesDetailQueryVariables>;
export const SearchExploreDocument = gql`
    query SearchExplore($where: ExploreSearchInput!, $take: Int!) {
  searchExplore(where: $where, take: $take) {
    ...ExploreSearchResult
  }
}
    ${ExploreSearchResultFragmentDoc}`;

/**
 * __useSearchExploreQuery__
 *
 * To run a query within a React component, call `useSearchExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchExploreQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchExploreQuery(baseOptions: Apollo.QueryHookOptions<SearchExploreQuery, SearchExploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchExploreQuery, SearchExploreQueryVariables>(SearchExploreDocument, options);
      }
export function useSearchExploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchExploreQuery, SearchExploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchExploreQuery, SearchExploreQueryVariables>(SearchExploreDocument, options);
        }
export type SearchExploreQueryHookResult = ReturnType<typeof useSearchExploreQuery>;
export type SearchExploreLazyQueryHookResult = ReturnType<typeof useSearchExploreLazyQuery>;
export type SearchExploreQueryResult = Apollo.QueryResult<SearchExploreQuery, SearchExploreQueryVariables>;
export const ExportProfileDocument = gql`
    mutation ExportProfile($where: UserUniqueInput!) {
  exportProfile(where: $where)
}
    `;
export type ExportProfileMutationFn = Apollo.MutationFunction<ExportProfileMutation, ExportProfileMutationVariables>;

/**
 * __useExportProfileMutation__
 *
 * To run a mutation, you first call `useExportProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExportProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exportProfileMutation, { data, loading, error }] = useExportProfileMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useExportProfileMutation(baseOptions?: Apollo.MutationHookOptions<ExportProfileMutation, ExportProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExportProfileMutation, ExportProfileMutationVariables>(ExportProfileDocument, options);
      }
export type ExportProfileMutationHookResult = ReturnType<typeof useExportProfileMutation>;
export type ExportProfileMutationResult = Apollo.MutationResult<ExportProfileMutation>;
export type ExportProfileMutationOptions = Apollo.BaseMutationOptions<ExportProfileMutation, ExportProfileMutationVariables>;
export const FavoritesDocument = gql`
    query Favorites {
  profile {
    favorites {
      ...Artefact
    }
  }
}
    ${ArtefactFragmentDoc}`;

/**
 * __useFavoritesQuery__
 *
 * To run a query within a React component, call `useFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavoritesQuery(baseOptions?: Apollo.QueryHookOptions<FavoritesQuery, FavoritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoritesQuery, FavoritesQueryVariables>(FavoritesDocument, options);
      }
export function useFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoritesQuery, FavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoritesQuery, FavoritesQueryVariables>(FavoritesDocument, options);
        }
export type FavoritesQueryHookResult = ReturnType<typeof useFavoritesQuery>;
export type FavoritesLazyQueryHookResult = ReturnType<typeof useFavoritesLazyQuery>;
export type FavoritesQueryResult = Apollo.QueryResult<FavoritesQuery, FavoritesQueryVariables>;
export const GenerateConclusionDocument = gql`
    query GenerateConclusion($where: StoryConclusionGenerateInput!) {
  generateConclusion(where: $where)
}
    `;

/**
 * __useGenerateConclusionQuery__
 *
 * To run a query within a React component, call `useGenerateConclusionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateConclusionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateConclusionQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGenerateConclusionQuery(baseOptions: Apollo.QueryHookOptions<GenerateConclusionQuery, GenerateConclusionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateConclusionQuery, GenerateConclusionQueryVariables>(GenerateConclusionDocument, options);
      }
export function useGenerateConclusionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateConclusionQuery, GenerateConclusionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateConclusionQuery, GenerateConclusionQueryVariables>(GenerateConclusionDocument, options);
        }
export type GenerateConclusionQueryHookResult = ReturnType<typeof useGenerateConclusionQuery>;
export type GenerateConclusionLazyQueryHookResult = ReturnType<typeof useGenerateConclusionLazyQuery>;
export type GenerateConclusionQueryResult = Apollo.QueryResult<GenerateConclusionQuery, GenerateConclusionQueryVariables>;
export const GenerateIntroductionDocument = gql`
    query GenerateIntroduction($where: StoryIntroductionGenerateInput!) {
  generateIntroduction(where: $where)
}
    `;

/**
 * __useGenerateIntroductionQuery__
 *
 * To run a query within a React component, call `useGenerateIntroductionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateIntroductionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateIntroductionQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGenerateIntroductionQuery(baseOptions: Apollo.QueryHookOptions<GenerateIntroductionQuery, GenerateIntroductionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateIntroductionQuery, GenerateIntroductionQueryVariables>(GenerateIntroductionDocument, options);
      }
export function useGenerateIntroductionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateIntroductionQuery, GenerateIntroductionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateIntroductionQuery, GenerateIntroductionQueryVariables>(GenerateIntroductionDocument, options);
        }
export type GenerateIntroductionQueryHookResult = ReturnType<typeof useGenerateIntroductionQuery>;
export type GenerateIntroductionLazyQueryHookResult = ReturnType<typeof useGenerateIntroductionLazyQuery>;
export type GenerateIntroductionQueryResult = Apollo.QueryResult<GenerateIntroductionQuery, GenerateIntroductionQueryVariables>;
export const GenerateThoughtDocument = gql`
    query GenerateThought($where: StoryModuleThoughtInput!) {
  generateThought(where: $where)
}
    `;

/**
 * __useGenerateThoughtQuery__
 *
 * To run a query within a React component, call `useGenerateThoughtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateThoughtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateThoughtQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGenerateThoughtQuery(baseOptions: Apollo.QueryHookOptions<GenerateThoughtQuery, GenerateThoughtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateThoughtQuery, GenerateThoughtQueryVariables>(GenerateThoughtDocument, options);
      }
export function useGenerateThoughtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateThoughtQuery, GenerateThoughtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateThoughtQuery, GenerateThoughtQueryVariables>(GenerateThoughtDocument, options);
        }
export type GenerateThoughtQueryHookResult = ReturnType<typeof useGenerateThoughtQuery>;
export type GenerateThoughtLazyQueryHookResult = ReturnType<typeof useGenerateThoughtLazyQuery>;
export type GenerateThoughtQueryResult = Apollo.QueryResult<GenerateThoughtQuery, GenerateThoughtQueryVariables>;
export const IntroductionTemplateDocument = gql`
    query IntroductionTemplate {
  introductionTemplate {
    systemTemplate
    userTemplate
  }
}
    `;

/**
 * __useIntroductionTemplateQuery__
 *
 * To run a query within a React component, call `useIntroductionTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntroductionTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntroductionTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useIntroductionTemplateQuery(baseOptions?: Apollo.QueryHookOptions<IntroductionTemplateQuery, IntroductionTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IntroductionTemplateQuery, IntroductionTemplateQueryVariables>(IntroductionTemplateDocument, options);
      }
export function useIntroductionTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IntroductionTemplateQuery, IntroductionTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IntroductionTemplateQuery, IntroductionTemplateQueryVariables>(IntroductionTemplateDocument, options);
        }
export type IntroductionTemplateQueryHookResult = ReturnType<typeof useIntroductionTemplateQuery>;
export type IntroductionTemplateLazyQueryHookResult = ReturnType<typeof useIntroductionTemplateLazyQuery>;
export type IntroductionTemplateQueryResult = Apollo.QueryResult<IntroductionTemplateQuery, IntroductionTemplateQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyFavouritesDocument = gql`
    query myFavourites {
  myFavourites {
    ...Artefact
  }
}
    ${ArtefactFragmentDoc}`;

/**
 * __useMyFavouritesQuery__
 *
 * To run a query within a React component, call `useMyFavouritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFavouritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFavouritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFavouritesQuery(baseOptions?: Apollo.QueryHookOptions<MyFavouritesQuery, MyFavouritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFavouritesQuery, MyFavouritesQueryVariables>(MyFavouritesDocument, options);
      }
export function useMyFavouritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFavouritesQuery, MyFavouritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFavouritesQuery, MyFavouritesQueryVariables>(MyFavouritesDocument, options);
        }
export type MyFavouritesQueryHookResult = ReturnType<typeof useMyFavouritesQuery>;
export type MyFavouritesLazyQueryHookResult = ReturnType<typeof useMyFavouritesLazyQuery>;
export type MyFavouritesQueryResult = Apollo.QueryResult<MyFavouritesQuery, MyFavouritesQueryVariables>;
export const MyStoriesDocument = gql`
    query MyStories($language: Language!) {
  myStories(language: $language) {
    ...Story
  }
}
    ${StoryFragmentDoc}`;

/**
 * __useMyStoriesQuery__
 *
 * To run a query within a React component, call `useMyStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyStoriesQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useMyStoriesQuery(baseOptions: Apollo.QueryHookOptions<MyStoriesQuery, MyStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyStoriesQuery, MyStoriesQueryVariables>(MyStoriesDocument, options);
      }
export function useMyStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyStoriesQuery, MyStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyStoriesQuery, MyStoriesQueryVariables>(MyStoriesDocument, options);
        }
export type MyStoriesQueryHookResult = ReturnType<typeof useMyStoriesQuery>;
export type MyStoriesLazyQueryHookResult = ReturnType<typeof useMyStoriesLazyQuery>;
export type MyStoriesQueryResult = Apollo.QueryResult<MyStoriesQuery, MyStoriesQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const RandomStringDocument = gql`
    query RandomString($where: LanguageInput!) {
  queryString(where: $where)
}
    `;

/**
 * __useRandomStringQuery__
 *
 * To run a query within a React component, call `useRandomStringQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomStringQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomStringQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRandomStringQuery(baseOptions: Apollo.QueryHookOptions<RandomStringQuery, RandomStringQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomStringQuery, RandomStringQueryVariables>(RandomStringDocument, options);
      }
export function useRandomStringLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomStringQuery, RandomStringQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomStringQuery, RandomStringQueryVariables>(RandomStringDocument, options);
        }
export type RandomStringQueryHookResult = ReturnType<typeof useRandomStringQuery>;
export type RandomStringLazyQueryHookResult = ReturnType<typeof useRandomStringLazyQuery>;
export type RandomStringQueryResult = Apollo.QueryResult<RandomStringQuery, RandomStringQueryVariables>;
export const ReportedArtefactDocument = gql`
    query ReportedArtefact($where: ArtefactNotificationUniqueInput!, $language: Language!) {
  reportedArtefact(where: $where, language: $language) {
    artefact {
      ...Artefact
    }
    id
    message
    isRead
  }
}
    ${ArtefactFragmentDoc}`;

/**
 * __useReportedArtefactQuery__
 *
 * To run a query within a React component, call `useReportedArtefactQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedArtefactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedArtefactQuery({
 *   variables: {
 *      where: // value for 'where'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useReportedArtefactQuery(baseOptions: Apollo.QueryHookOptions<ReportedArtefactQuery, ReportedArtefactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportedArtefactQuery, ReportedArtefactQueryVariables>(ReportedArtefactDocument, options);
      }
export function useReportedArtefactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportedArtefactQuery, ReportedArtefactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportedArtefactQuery, ReportedArtefactQueryVariables>(ReportedArtefactDocument, options);
        }
export type ReportedArtefactQueryHookResult = ReturnType<typeof useReportedArtefactQuery>;
export type ReportedArtefactLazyQueryHookResult = ReturnType<typeof useReportedArtefactLazyQuery>;
export type ReportedArtefactQueryResult = Apollo.QueryResult<ReportedArtefactQuery, ReportedArtefactQueryVariables>;
export const ReportedArtefactsDocument = gql`
    query ReportedArtefacts($language: Language!) {
  reportedArtefacts(language: $language) {
    artefact {
      ...Artefact
    }
    id
    message
    isRead
  }
}
    ${ArtefactFragmentDoc}`;

/**
 * __useReportedArtefactsQuery__
 *
 * To run a query within a React component, call `useReportedArtefactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedArtefactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedArtefactsQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useReportedArtefactsQuery(baseOptions: Apollo.QueryHookOptions<ReportedArtefactsQuery, ReportedArtefactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportedArtefactsQuery, ReportedArtefactsQueryVariables>(ReportedArtefactsDocument, options);
      }
export function useReportedArtefactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportedArtefactsQuery, ReportedArtefactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportedArtefactsQuery, ReportedArtefactsQueryVariables>(ReportedArtefactsDocument, options);
        }
export type ReportedArtefactsQueryHookResult = ReturnType<typeof useReportedArtefactsQuery>;
export type ReportedArtefactsLazyQueryHookResult = ReturnType<typeof useReportedArtefactsLazyQuery>;
export type ReportedArtefactsQueryResult = Apollo.QueryResult<ReportedArtefactsQuery, ReportedArtefactsQueryVariables>;
export const ReportedStoriesDocument = gql`
    query ReportedStories($language: Language!) {
  reportedStories(language: $language) {
    id
    isRead
    story {
      ...Story
    }
  }
}
    ${StoryFragmentDoc}`;

/**
 * __useReportedStoriesQuery__
 *
 * To run a query within a React component, call `useReportedStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedStoriesQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useReportedStoriesQuery(baseOptions: Apollo.QueryHookOptions<ReportedStoriesQuery, ReportedStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportedStoriesQuery, ReportedStoriesQueryVariables>(ReportedStoriesDocument, options);
      }
export function useReportedStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportedStoriesQuery, ReportedStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportedStoriesQuery, ReportedStoriesQueryVariables>(ReportedStoriesDocument, options);
        }
export type ReportedStoriesQueryHookResult = ReturnType<typeof useReportedStoriesQuery>;
export type ReportedStoriesLazyQueryHookResult = ReturnType<typeof useReportedStoriesLazyQuery>;
export type ReportedStoriesQueryResult = Apollo.QueryResult<ReportedStoriesQuery, ReportedStoriesQueryVariables>;
export const ReportedStoryDocument = gql`
    query ReportedStory($where: StoryNotificationUniqueInput!, $language: Language!) {
  reportedStory(where: $where, language: $language) {
    id
    story {
      ...Story
    }
  }
}
    ${StoryFragmentDoc}`;

/**
 * __useReportedStoryQuery__
 *
 * To run a query within a React component, call `useReportedStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedStoryQuery({
 *   variables: {
 *      where: // value for 'where'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useReportedStoryQuery(baseOptions: Apollo.QueryHookOptions<ReportedStoryQuery, ReportedStoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportedStoryQuery, ReportedStoryQueryVariables>(ReportedStoryDocument, options);
      }
export function useReportedStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportedStoryQuery, ReportedStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportedStoryQuery, ReportedStoryQueryVariables>(ReportedStoryDocument, options);
        }
export type ReportedStoryQueryHookResult = ReturnType<typeof useReportedStoryQuery>;
export type ReportedStoryLazyQueryHookResult = ReturnType<typeof useReportedStoryLazyQuery>;
export type ReportedStoryQueryResult = Apollo.QueryResult<ReportedStoryQuery, ReportedStoryQueryVariables>;
export const SetConclusionDocument = gql`
    mutation SetConclusion($where: StoryConclusionInput!) {
  setStoryConclusion(where: $where) {
    id
    conclusion
  }
}
    `;
export type SetConclusionMutationFn = Apollo.MutationFunction<SetConclusionMutation, SetConclusionMutationVariables>;

/**
 * __useSetConclusionMutation__
 *
 * To run a mutation, you first call `useSetConclusionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetConclusionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setConclusionMutation, { data, loading, error }] = useSetConclusionMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSetConclusionMutation(baseOptions?: Apollo.MutationHookOptions<SetConclusionMutation, SetConclusionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetConclusionMutation, SetConclusionMutationVariables>(SetConclusionDocument, options);
      }
export type SetConclusionMutationHookResult = ReturnType<typeof useSetConclusionMutation>;
export type SetConclusionMutationResult = Apollo.MutationResult<SetConclusionMutation>;
export type SetConclusionMutationOptions = Apollo.BaseMutationOptions<SetConclusionMutation, SetConclusionMutationVariables>;
export const SetIntroductionDocument = gql`
    mutation SetIntroduction($where: StoryIntroductionInput!) {
  setStoryIntroduction(where: $where) {
    id
    introduction
  }
}
    `;
export type SetIntroductionMutationFn = Apollo.MutationFunction<SetIntroductionMutation, SetIntroductionMutationVariables>;

/**
 * __useSetIntroductionMutation__
 *
 * To run a mutation, you first call `useSetIntroductionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetIntroductionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setIntroductionMutation, { data, loading, error }] = useSetIntroductionMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSetIntroductionMutation(baseOptions?: Apollo.MutationHookOptions<SetIntroductionMutation, SetIntroductionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetIntroductionMutation, SetIntroductionMutationVariables>(SetIntroductionDocument, options);
      }
export type SetIntroductionMutationHookResult = ReturnType<typeof useSetIntroductionMutation>;
export type SetIntroductionMutationResult = Apollo.MutationResult<SetIntroductionMutation>;
export type SetIntroductionMutationOptions = Apollo.BaseMutationOptions<SetIntroductionMutation, SetIntroductionMutationVariables>;
export const GetSimilarArtefactsDocument = gql`
    query getSimilarArtefacts($where: ArtefactUniqueInput!, $take: Int!) {
  searchSimilarArtefacts(take: $take, where: $where) {
    ...Artefact
  }
}
    ${ArtefactFragmentDoc}`;

/**
 * __useGetSimilarArtefactsQuery__
 *
 * To run a query within a React component, call `useGetSimilarArtefactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSimilarArtefactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSimilarArtefactsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetSimilarArtefactsQuery(baseOptions: Apollo.QueryHookOptions<GetSimilarArtefactsQuery, GetSimilarArtefactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSimilarArtefactsQuery, GetSimilarArtefactsQueryVariables>(GetSimilarArtefactsDocument, options);
      }
export function useGetSimilarArtefactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSimilarArtefactsQuery, GetSimilarArtefactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSimilarArtefactsQuery, GetSimilarArtefactsQueryVariables>(GetSimilarArtefactsDocument, options);
        }
export type GetSimilarArtefactsQueryHookResult = ReturnType<typeof useGetSimilarArtefactsQuery>;
export type GetSimilarArtefactsLazyQueryHookResult = ReturnType<typeof useGetSimilarArtefactsLazyQuery>;
export type GetSimilarArtefactsQueryResult = Apollo.QueryResult<GetSimilarArtefactsQuery, GetSimilarArtefactsQueryVariables>;
export const StoriesDocument = gql`
    query Stories($language: Language!, $orderBy: StoryOrderByInput) {
  stories(language: $language, orderBy: $orderBy) {
    ...Story
  }
}
    ${StoryFragmentDoc}`;

/**
 * __useStoriesQuery__
 *
 * To run a query within a React component, call `useStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoriesQuery({
 *   variables: {
 *      language: // value for 'language'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useStoriesQuery(baseOptions: Apollo.QueryHookOptions<StoriesQuery, StoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoriesQuery, StoriesQueryVariables>(StoriesDocument, options);
      }
export function useStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoriesQuery, StoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoriesQuery, StoriesQueryVariables>(StoriesDocument, options);
        }
export type StoriesQueryHookResult = ReturnType<typeof useStoriesQuery>;
export type StoriesLazyQueryHookResult = ReturnType<typeof useStoriesLazyQuery>;
export type StoriesQueryResult = Apollo.QueryResult<StoriesQuery, StoriesQueryVariables>;
export const StoryDocument = gql`
    query Story($where: StoryUniqueInput!) {
  story(where: $where) {
    ...Story
  }
}
    ${StoryFragmentDoc}`;

/**
 * __useStoryQuery__
 *
 * To run a query within a React component, call `useStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoryQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useStoryQuery(baseOptions: Apollo.QueryHookOptions<StoryQuery, StoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoryQuery, StoryQueryVariables>(StoryDocument, options);
      }
export function useStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoryQuery, StoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoryQuery, StoryQueryVariables>(StoryDocument, options);
        }
export type StoryQueryHookResult = ReturnType<typeof useStoryQuery>;
export type StoryLazyQueryHookResult = ReturnType<typeof useStoryLazyQuery>;
export type StoryQueryResult = Apollo.QueryResult<StoryQuery, StoryQueryVariables>;
export const SuggestArtefactsDocument = gql`
    query SuggestArtefacts($take: Int!, $where: SuggestRelatedArtefactsInput!) {
  suggestRelatedArtefacts(take: $take, where: $where) {
    ...Artefact
  }
}
    ${ArtefactFragmentDoc}`;

/**
 * __useSuggestArtefactsQuery__
 *
 * To run a query within a React component, call `useSuggestArtefactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestArtefactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestArtefactsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSuggestArtefactsQuery(baseOptions: Apollo.QueryHookOptions<SuggestArtefactsQuery, SuggestArtefactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuggestArtefactsQuery, SuggestArtefactsQueryVariables>(SuggestArtefactsDocument, options);
      }
export function useSuggestArtefactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuggestArtefactsQuery, SuggestArtefactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuggestArtefactsQuery, SuggestArtefactsQueryVariables>(SuggestArtefactsDocument, options);
        }
export type SuggestArtefactsQueryHookResult = ReturnType<typeof useSuggestArtefactsQuery>;
export type SuggestArtefactsLazyQueryHookResult = ReturnType<typeof useSuggestArtefactsLazyQuery>;
export type SuggestArtefactsQueryResult = Apollo.QueryResult<SuggestArtefactsQuery, SuggestArtefactsQueryVariables>;
export const SuggestExploreDocument = gql`
    query SuggestExplore($where: SuggestExploreInput!) {
  suggestExplore(where: $where) {
    text
    type
  }
}
    `;

/**
 * __useSuggestExploreQuery__
 *
 * To run a query within a React component, call `useSuggestExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestExploreQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSuggestExploreQuery(baseOptions: Apollo.QueryHookOptions<SuggestExploreQuery, SuggestExploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuggestExploreQuery, SuggestExploreQueryVariables>(SuggestExploreDocument, options);
      }
export function useSuggestExploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuggestExploreQuery, SuggestExploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuggestExploreQuery, SuggestExploreQueryVariables>(SuggestExploreDocument, options);
        }
export type SuggestExploreQueryHookResult = ReturnType<typeof useSuggestExploreQuery>;
export type SuggestExploreLazyQueryHookResult = ReturnType<typeof useSuggestExploreLazyQuery>;
export type SuggestExploreQueryResult = Apollo.QueryResult<SuggestExploreQuery, SuggestExploreQueryVariables>;
export const ThoughtTemplateDocument = gql`
    query ThoughtTemplate {
  thoughtTemplate {
    systemTemplate
    userTemplate
  }
}
    `;

/**
 * __useThoughtTemplateQuery__
 *
 * To run a query within a React component, call `useThoughtTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useThoughtTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThoughtTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useThoughtTemplateQuery(baseOptions?: Apollo.QueryHookOptions<ThoughtTemplateQuery, ThoughtTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ThoughtTemplateQuery, ThoughtTemplateQueryVariables>(ThoughtTemplateDocument, options);
      }
export function useThoughtTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ThoughtTemplateQuery, ThoughtTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ThoughtTemplateQuery, ThoughtTemplateQueryVariables>(ThoughtTemplateDocument, options);
        }
export type ThoughtTemplateQueryHookResult = ReturnType<typeof useThoughtTemplateQuery>;
export type ThoughtTemplateLazyQueryHookResult = ReturnType<typeof useThoughtTemplateLazyQuery>;
export type ThoughtTemplateQueryResult = Apollo.QueryResult<ThoughtTemplateQuery, ThoughtTemplateQueryVariables>;
export const namedOperations = {
  Query: {
    GetArtefact: 'GetArtefact',
    ConclusionTemplate: 'ConclusionTemplate',
    EntitiesDetail: 'EntitiesDetail',
    SearchExplore: 'SearchExplore',
    Favorites: 'Favorites',
    GenerateConclusion: 'GenerateConclusion',
    GenerateIntroduction: 'GenerateIntroduction',
    GenerateThought: 'GenerateThought',
    IntroductionTemplate: 'IntroductionTemplate',
    Me: 'Me',
    myFavourites: 'myFavourites',
    MyStories: 'MyStories',
    Profile: 'Profile',
    RandomString: 'RandomString',
    ReportedArtefact: 'ReportedArtefact',
    ReportedArtefacts: 'ReportedArtefacts',
    ReportedStories: 'ReportedStories',
    ReportedStory: 'ReportedStory',
    getSimilarArtefacts: 'getSimilarArtefacts',
    Stories: 'Stories',
    Story: 'Story',
    SuggestArtefacts: 'SuggestArtefacts',
    SuggestExplore: 'SuggestExplore',
    ThoughtTemplate: 'ThoughtTemplate'
  },
  Mutation: {
    AddArtefactToBasket: 'AddArtefactToBasket',
    addToFavourite: 'addToFavourite',
    Authenticate: 'Authenticate',
    AuthenticateBLM: 'AuthenticateBLM',
    CreateModule: 'CreateModule',
    CreateStory: 'CreateStory',
    deleteArtefactFromFavourite: 'deleteArtefactFromFavourite',
    DeleteArtefactNotification: 'DeleteArtefactNotification',
    DeleteModule: 'DeleteModule',
    DeleteStory: 'DeleteStory',
    DeleteProfile: 'DeleteProfile',
    Login: 'Login',
    Logout: 'Logout',
    PublishStory: 'PublishStory',
    rateStory: 'rateStory',
    RemoveArtefactFromBasket: 'RemoveArtefactFromBasket',
    ReportArtefact: 'ReportArtefact',
    ReportStory: 'ReportStory',
    SetStoryConclusionTemplate: 'SetStoryConclusionTemplate',
    setStoryIntroductionTemplate: 'setStoryIntroductionTemplate',
    SetModuleThoughtPrompt: 'SetModuleThoughtPrompt',
    UnpublishStory: 'UnpublishStory',
    UpdateArtefactNotification: 'UpdateArtefactNotification',
    UpdateModule: 'UpdateModule',
    UpdateStory: 'UpdateStory',
    UpdateStoryNotification: 'UpdateStoryNotification',
    updateUserProfile: 'updateUserProfile',
    verifyEntity: 'verifyEntity',
    ExportProfile: 'ExportProfile',
    SetConclusion: 'SetConclusion',
    SetIntroduction: 'SetIntroduction'
  },
  Fragment: {
    Image: 'Image',
    Me: 'Me',
    MeError: 'MeError',
    MeResponse: 'MeResponse',
    Artefact: 'Artefact',
    Entity: 'Entity',
    ExploreSearchResult: 'ExploreSearchResult',
    ExploreGridItem: 'ExploreGridItem',
    ExploreArtefact: 'ExploreArtefact',
    ExploreStory: 'ExploreStory',
    Profile: 'Profile',
    Story: 'Story',
    Module: 'Module',
    PreviewImage: 'PreviewImage'
  }
}
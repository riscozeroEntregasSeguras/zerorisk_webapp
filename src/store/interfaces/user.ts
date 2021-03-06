export enum USER_STATUS {
  'ESTOU_BEM' = 'ESTOU_BEM',
  'EU_QUARENTENA' = 'EU_QUARENTENA',
  'COM_CONVID_SEM_SINTOMAS' = 'COM_CONVID_SEM_SINTOMAS',
  'COM_CONVID_DOENTE' = 'COM_CONVID_DOENTE',
  'RECUPERADO' = 'RECUPERADO',
  'FALECIDO' = 'FALECIDO',
}

export enum USER_LOCATION {
  'EM_TRANSITO' = 'EM_TRANSITO',
  'ISOLAMENTO_EM_CASA' = 'ISOLAMENTO_EM_CASA',
  'ISOLAMENTO_NO_ESTRANGEIRO' = 'ISOLAMENTO_NO_ESTRANGEIRO',
  'HOSPITALIZADO' = 'HOSPITALIZADO',
}

export interface USER_INPUTS {
  email: string
  name: string
  nickname: string
  password: string
}

export interface USER {
  id: string
  email: string
  name: string
  nickname: string
  emailValidated: boolean
  status: USER_STATUS
  location: USER_LOCATION
  avatar: string
}

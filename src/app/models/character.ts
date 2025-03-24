export interface Character {
    info: Info
    results: Result[]
  }
  
  export interface Info {
    count: number
    pages: number
    next: string
    prev: any
  }
  
  export interface Result {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Origin
    location: Location
    image: string
    episode: string[]
    url: string
    created: string
  }
  
  export interface Origin {
    name: string
    url: string
  }
  
  export interface Location {
    name: string
    url: string
  }

  export interface FilterCharacter {
    name: string
    status: string
  }

  export interface ViewCharacter{
    id: number
    name: string
    status: string
    species: string
    type: string
    origin: string
    location: string
    image: string
    episodes: string[]
    characterOrigin:string[]
    characterLocation:string[]
  }
  
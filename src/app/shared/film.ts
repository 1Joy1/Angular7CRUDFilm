export class Film {
    id: number;
    filmName: string;
    genre: string;
    duration: string;
    dateRelease: string;
    ageLimit: number;
    description: string;
    subtitle: boolean;
    posterUrl: string;
    permittedIp: [string];


    constructor(filmName: string,
                genre: string,
                duration: string,
                dateRelease: string,
                ageLimit: number,
                description: string,
                subtitle: boolean,
                posterUrl: string,
                permittedIp: [string]) {

        this.filmName = filmName;
        this.genre = genre;
        this.duration = duration;
        this.dateRelease = dateRelease;
        this.ageLimit = ageLimit;
        this.description = description;
        this.subtitle = subtitle;
        this.posterUrl = posterUrl;
        this.permittedIp = permittedIp;
    }
}

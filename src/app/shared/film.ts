export class Film {
    id: number;
    filmName: string;
    genre: string;
    duration: string;
    dateRelease: string;
    ageLimit: number;
    description: string;
    subtitle: boolean;
    poster: string;
    permittedIp: [string];


    constructor(film_name: string,
                genre: string,
                duration: string,
                date_release: string,
                age_limit: number,
                description: string,
                subtitle: boolean,
                poster: string,
                permitted_ip: [string]) {

        this.filmName = film_name;
        this.genre = genre;
        this.duration = duration;
        this.dateRelease = date_release;
        this.ageLimit = age_limit;
        this.description = description;
        this.subtitle = subtitle;
        this.poster = poster;
        this.permittedIp = permitted_ip;
    }
}

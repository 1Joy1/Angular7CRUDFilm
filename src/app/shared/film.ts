export class Film {
    id: number;
    film_name: string;
    genre: string;
    duration: string;
    date_release: string;
    age_limit: number;
    description: string;
    subtitle: boolean;
    poster: string;
    permitted_ip: [string];


    constructor(film_name: string,
                genre: string,
                duration: string,
                date_release: string,
                age_limit: number,
                description: string,
                subtitle: boolean,
                poster: string,
                permitted_ip: [string]) {

        this.film_name = film_name;
        this.genre = genre;
        this.duration = duration;
        this.date_release = date_release;
        this.age_limit = age_limit;
        this.description = description;
        this.subtitle = subtitle;
        this.poster = poster;
        this.permitted_ip = permitted_ip;
    }
}

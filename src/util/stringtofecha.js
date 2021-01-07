export default function string_to_date(date_api){     
        var mydate = new Date(date_api);
        const date_iso = `${mydate.getDate()}/${mydate.getMonth() + 1}/${mydate.getFullYear()}`
        return date_iso

}
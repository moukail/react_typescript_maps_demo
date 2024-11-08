import axios from 'axios';
import {IpAddress} from "../types/ip-address.type.ts";

export const getIpAddress = async (): Promise<IpAddress> => {
    const response = await axios.get('http://ip-api.com/json?lang=en&fields=status,message,continent,country,regionName,city,lat,lon,timezone,isp,org,mobile,proxy,hosting,query');
    return response.data;
};
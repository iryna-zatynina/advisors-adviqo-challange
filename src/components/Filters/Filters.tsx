// @ts-nocheck
import "./Filters.scss";
import { LANGUAGES, STATUSES } from "../../shared/variables";
import { Select, Button } from 'antd';
import { IFilter } from '../../interfaces/interfaces';


interface FiLtersProps {
    filters: IFilter[],
    setFilters: (x: IFilter ) => void
}
const Filters = ({filters, setFilters}: FiLtersProps): JSX.Element => {
    const { Option } = Select;
    
    const onSelectChange = (key: string, value: string) => {
        const newFilter = {
            key: key,
            value: value
          };
      
          const foundIndex = filters.findIndex(f => f.key === key);
      
          if (foundIndex !== -1) {
            const updatedFilters = [...filters];
            updatedFilters[foundIndex] = newFilter;
            setFilters(updatedFilters);
          } else {
            setFilters(prevFilters => [...prevFilters, newFilter]);
          }
    };
    

    return (
        <div className="Filters">
            <span>Filter by:</span>
            <Select
                placeholder="Language"
                className="select"
                onChange={v => onSelectChange("language", v)}
            >
                {LANGUAGES.map((item, i) => (
                    <Option key={i} value={item}>{item}</Option>
                ))}
            </Select>
            <Select
                placeholder="Status"
                className="select"
                onChange={v => onSelectChange("status", v)}
            >
                {STATUSES.map((item, i) => (
                    <Option key={i} value={item}>{item}</Option>
                ))}
            </Select>
            <Button onClick={() => setFilters([])}>Reset</Button>
        </div>
    )
}

export default Filters;
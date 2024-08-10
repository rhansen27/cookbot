import MealType from '../Dropdowns/MealType'
import Allergy from '../Dropdowns/Allergy'
import Diet from '../Dropdowns/Diet'
import Region from '../Dropdowns/Region'


const Filter = () => {
    return (
        <div>
            <MealType />
            <Diet />
            <Allergy />
            <Region />
        </div>
    );
};
  
  export default Filter;
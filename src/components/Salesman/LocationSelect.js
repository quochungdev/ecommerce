import axios from "axios";
import { useEffect, useState } from "react";

function LocationSelect() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [result, setResult] = useState('');
  
    useEffect(() => {
      // Khi component được tạo, gọi axios để tải danh sách tỉnh
      axios.get('https://provinces.open-api.vn/api/?depth=1')
        .then((response) => {
          setProvinces(response.data);
        })
        .catch((error) => {
          console.error('Error fetching provinces:', error);
        });
    }, []);
  
    useEffect(() => {
      // Khi selectedProvince thay đổi, gọi axios để tải danh sách quận huyện
      if (selectedProvince !== '') {
        axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
          .then((response) => {
            setDistricts(response.data.districts);
          })
          .catch((error) => {
            console.error('Error fetching districts:', error);
          });
      } else {
        setDistricts([]);
        setWards([]);
      }
    }, [selectedProvince]);
  
    useEffect(() => {
      // Khi selectedDistrict thay đổi, gọi axios để tải danh sách phường xã
      if (selectedDistrict !== '') {
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
          .then((response) => {
            setWards(response.data.wards);
          })
          .catch((error) => {
            console.error('Error fetching wards:', error);
          });
      } else {
        setWards([]);
      }
    }, [selectedDistrict]);
  
    useEffect(() => {
      // Khi selectedProvince, selectedDistrict, hoặc selectedWard thay đổi, cập nhật kết quả
      if (selectedProvince !== '' && selectedDistrict !== '' && selectedWard !== '') {
        const provinceName = provinces.find((province) => province.code === selectedProvince)?.name || '';
        const districtName = districts.find((district) => district.code === selectedDistrict)?.name || '';
        const wardName = wards.find((ward) => ward.code === selectedWard)?.name || '';
        setResult(`${provinceName} | ${districtName} | ${wardName}`);
        console.log(provinceName);
      } else {
        setResult('');
      }
    }, [selectedProvince, selectedDistrict, selectedWard]);
  
    return (
      <div className="container">
        <h1>Chọn danh sách tỉnh</h1>
        <form action="">
          <select name="" id="province" onChange={(e) => setSelectedProvince(e.target.value)}>
            <option value="">chọn tỉnh</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
          <select name="" id="district" onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="">chọn quận</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
          <select name="" id="ward" onChange={(e) => setSelectedWard(e.target.value)}>
            <option value="">chọn phường</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </form>
  
        <h2 id="result">{result}</h2>
      </div>
    );
  }
  
  export default LocationSelect;
  
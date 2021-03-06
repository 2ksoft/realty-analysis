import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { createExample } from "../actions/Example";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
import RNPickerSelect from "react-native-picker-select";
import SelectMultiple from "react-native-select-multiple";

const CustomPredict = ({ navigation }) => {
  const [location, setLocation] = useState({});
  const [type, setType] = useState("");
  const [araeValue, setaAraeValue] = useState(1);
  const [bedroom, setBedroom] = useState(1);
  const [floor, setFloor] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [legal, setLegal] = useState(0);
  const [attribute, setAttribute] = useState([]);
  const [tienIch, setTienIch] = useState([]);
  const [noiThat, setNoiThat] = useState([]);

  const handleApplied = () => {
    const attributeString = toString(attribute);
    const tienIchString = toString(tienIch);
    const noiThatString = toString(noiThat);

    console.log(location);

    fetch(
      "https://dreamkatchr.herokuapp.com/predictHouse/" +
        location.longitude +
        "/" +
        location.latitude +
        "/" +
        type +
        "/" +
        araeValue +
        "/" +
        floor +
        "/" +
        bedroom +
        "/" +
        bathroom +
        "/" +
        legal +
        "/" +
        attributeString +
        "/" +
        tienIchString +
        "/" +
        noiThatString
    )
      .then((response) => response.json())
      .then((data) => {
        let dataConvert;
        for (var value of Object.values(data)) {
          console.log(value);
          dataConvert = value;
        }
      
        let type = dataConvert.loai;
        let data1 = dataConvert.reportData;
        let predictText = dataConvert.trend;
        navigation.navigate("DetailReport", {
          type,
          data: data1,
          predictText,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toString = (list) => {
    let result = "";
    list.forEach((item) => (result += item.value + ", "));
    return result;
  };

  const handleSearch = (detail) => {
    const locationSearch = detail.geometry.location;
    setLocation({
      latitude: locationSearch.lat,
      longitude: locationSearch.lng,
    });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <Text style={styles.textInput}>Nhập địa điểm muốn dự đoán</Text>
      <SearchBar styling={{}} handleSearch={handleSearch} />
      <Text style={styles.textInput}>Chọn loại hình bất động sản</Text>
      <RNPickerSelect
        onValueChange={(value) => setType(value)}
        items={[
          { label: "Nhà riêng", value: "Nhà riêng" },
          { label: "Nhà mặt phố", value: "Nhà mặt phố" },
          { label: "Căn hộ Cao cấp", value: "Căn hộ Cao cấp" },
          { label: "Căn hộ trung cấp", value: "Căn hộ trung cấp" },
          { label: "Nhà biệt thự", value: "Nhà biệt thự" },
          { label: "Biệt thự liền kề", value: "Biệt thự liền kề" },
          { label: "Căn hộ chung cư", value: "Căn hộ chung cư" },
          { label: "Nhà rẻ", value: "Nhà rẻ" },
          { label: "Căn hộ Tập thể", value: "Căn hộ Tập thể" },
          { label: "Căn hộ rẻ", value: "Căn hộ rẻ" },
          { label: "Khác", value: "Khác" },
        ]}
      />
      <Text style={styles.textInput}>Nhập Diện Tích</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setaAraeValue(text)}
        value={araeValue}
      />
      <Text style={styles.textInput}>Tổng số tầng</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setFloor(text)}
        value={floor}
      />
      <Text style={styles.textInput}>Tổng số phòng ngủ</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setBedroom(text)}
        value={bedroom}
      />
      <Text style={styles.textInput}>Tổng số phòng tắm</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setBathroom(text)}
        value={bathroom}
      />
      <Text style={styles.textInput}>Pháp lý(có sổ đỏ hay không?)</Text>
      <RNPickerSelect
        onValueChange={(value) => setLegal(value)}
        items={[
          { label: "Có", value: "1" },
          { label: "Không", value: "0" },
        ]}
      />
      <Text style={styles.textInput}>Đặc điểm xã hội</Text>
      <SelectMultiple
        items={[
          "Gần trường",
          "Gần bệnh viện",
          "Gần công viên",
          "Gần nhà trẻ",
          "Tiện kinh doanh",
          "Khu dân trí cao",
          "Gần chợ",
        ]}
        selectedItems={attribute}
        onSelectionsChange={(selectedItem) => setAttribute(selectedItem)}
      />
      <Text style={styles.textInput}>Tiện ích kèm theo</Text>
      <SelectMultiple
        items={[
          "Chỗ để xe máy",
          "Chỗ để ôtô",
          "Trung tâm thể dục",
          "Hệ thống an ninh",
          "Nhân viên bảo vệ",
          "Hồ bơi",
          "Truyền hình cáp",
          "Internet",
        ]}
        selectedItems={tienIch}
        onSelectionsChange={(selectedItem) => setTienIch(selectedItem)}
      />
      <Text style={styles.textInput}>Nội Thất</Text>
      <SelectMultiple
        items={[
          "Bàn ăn",
          "Bàn trà",
          "Sofa phòng khách",
          "Kệ ti vi",
          "Giường ngủ",
          "Tủ quần áo",
          "Sàn gỗ/đá",
          "Trần thả",
          "Tủ bếp",
          "Bình nóng lạnh",
          "Điều hòa",
          "Bồn rửa mặt",
          "Bồn tắm",
        ]}
        selectedItems={noiThat}
        onSelectionsChange={(selectedItem) => setNoiThat(selectedItem)}
      />
      <Button
        onPress={handleApplied}
        title="Apply"
        color="black"
      />
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { ...state.example };
};

export default connect(mapStateToProps, { createExample })(CustomPredict);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
  },
  textInput: {
    fontSize: 18,
    fontWeight: "500",
  },
  subtitle: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

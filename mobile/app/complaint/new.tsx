import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/constants/api";

const complaintCategories = [
  {
    id: "roads",
    title: "Roads",
    icon: "truck",
    color: "#FB923C",
    bg: "#FFF7ED",
  },
  {
    id: "water",
    title: "Water",
    icon: "droplet",
    color: "#0EA5E9",
    bg: "#EFF6FF",
  },
  {
    id: "streetlight",
    title: "Street Light",
    icon: "sun",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    id: "encroachment",
    title: "Encroachment",
    icon: "alert-triangle",
    color: "#DC2626",
    bg: "#FEF2F2",
  },
  {
    id: "other",
    title: "Other",
    icon: "more-horizontal",
    color: "#475569",
    bg: "#F1F5F9",
  },
];

export default function NewComplaintScreen() {
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("roads");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      setDetectingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Required", "Please allow location access.");
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const reverse = await Location.reverseGeocodeAsync({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });

      const place = reverse[0];

      const address = [
        place?.name,
        place?.street,
        place?.subregion,
        place?.city,
      ]
        .filter(Boolean)
        .join(", ");

      setLocation(address || "Location detected");
    } catch (err) {
      console.log("Location detect error", err);
    } finally {
      setDetectingLocation(false);
    }
  };

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow gallery access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!title.trim()) {
        Alert.alert("Error", "Please enter complaint title.");
        return;
      }

      if (!description.trim()) {
        Alert.alert("Error", "Please enter complaint description.");
        return;
      }

      if (!location.trim()) {
        Alert.alert("Error", "Please detect or enter location.");
        return;
      }

      setSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category: selectedCategory,
          photo_url: photoUri || null,
          location,
          ward: user?.ward || "Ward 6A",
          ward_code: (user as any)?.wardCode || "6A",
          assigned_officer_id: (user as any)?.nagarsevakId || null,
          user_id: user?.id || null,
          user_name: user?.name || null,
          user_mobile: user?.mobile || null,
          user_address: user?.address || null,
          user_age: user?.age || null,
          user_email: user?.email || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        Alert.alert("Backend Error", data.error || "Complaint submit failed");

        throw new Error(data.error || "Complaint submit failed");
      }

      Alert.alert(
        "Complaint Submitted",
        "Your complaint has been submitted successfully.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/complaint/list" as any),
          },
        ],
      );
    } catch (err: any) {
      console.log(err);

      Alert.alert(
        "Error",
        err?.message || "Complaint submit failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#9A3412", "#EA580C", "#FB923C"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Report an Issue</Text>

        <Text style={styles.headerSub}>
          Your complaint goes directly to ward officer
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoryGrid}>
          {complaintCategories.map((item) => {
            const active = selectedCategory === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryCard,
                  active && {
                    borderColor: item.color,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <View
                  style={[styles.categoryIcon, { backgroundColor: item.bg }]}
                >
                  <Feather
                    name={item.icon as any}
                    size={24}
                    color={item.color}
                  />
                </View>

                <Text style={styles.categoryText}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>COMPLAINT TITLE</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter complaint title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>DESCRIPTION</Text>

        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe the issue"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>LOCATION</Text>

        <View style={styles.locationRow}>
          <View style={styles.locationIconWrap}>
            <Feather name="map-pin" size={22} color="#EA580C" />
          </View>

          <TextInput
            style={styles.locationInput}
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <TouchableOpacity onPress={detectLocation} style={styles.detectBtn}>
          {detectingLocation ? (
            <ActivityIndicator color="#EA580C" />
          ) : (
            <>
              <Feather name="navigation" size={18} color="#EA580C" />

              <Text style={styles.detectBtnText}>Detect Current Location</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.wardText}>{user?.ward || "Ward not selected"}</Text>

        <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
          <Feather name="image" size={18} color="#EA580C" />

          <Text style={styles.imageBtnText}>
            {photoUri ? "Photo Selected" : "Upload Photo"}
          </Text>
        </TouchableOpacity>

        <View style={styles.noticeBox}>
          <Feather name="info" size={18} color="#EA580C" />

          <Text style={styles.noticeText}>
            Your complaint will be assigned to the ward officer within 24 hours.
            You will receive status updates here.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <LinearGradient
            colors={["#059669", "#10B981"]}
            style={styles.submitGradient}
          >
            {submitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Feather name="send" size={22} color="white" />

                <Text style={styles.submitText}>Submit Complaint</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 6,
  },
  backText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },
  headerSub: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
    fontSize: 14,
  },
  scroll: {
    padding: 20,
    paddingBottom: 60,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  categoryCard: {
    width: "18%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
    color: "#334155",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 14,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  descriptionInput: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    minHeight: 150,
    fontSize: 18,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  locationIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
  },
  locationInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  detectBtn: {
    marginTop: 14,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  detectBtnText: {
    color: "#EA580C",
    fontWeight: "700",
    fontSize: 15,
  },
  wardText: {
    marginTop: 14,
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },
  imageBtn: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  imageBtnText: {
    color: "#EA580C",
    fontSize: 15,
    fontWeight: "700",
  },
  noticeBox: {
    marginTop: 24,
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    gap: 12,
  },
  noticeText: {
    flex: 1,
    color: "#C2410C",
    lineHeight: 22,
    fontSize: 15,
  },
  submitBtn: {
    marginTop: 30,
    borderRadius: 22,
    overflow: "hidden",
  },
  submitGradient: {
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  submitText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
});

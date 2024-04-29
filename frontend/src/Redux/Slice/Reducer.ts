import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import runChat from "../../config/gemini";
const server="https://gemini-clone-backend-dilh.onrender.com";
export interface fetchGeminiResultArgs {
  prompt: string;
}
interface fetchGeminiResultResponse {
  result: string;
}

// fetch data from gemini ai
export const fetchGeminiResult = createAsyncThunk<
  fetchGeminiResultResponse,
  fetchGeminiResultArgs
>("fetch/geminiResult", async ({ prompt }) => {
  const result = await runChat(prompt);
  return { result };
});

// store the result

type storeResultArg = {
  heading: string;
  data: string;
  user: string;
};
type storeResultRes = {
  success: boolean;
  message: string;
};
// store result function
export const storeResult = createAsyncThunk<storeResultRes, storeResultArg>(
  "store/iResult",
  async (data) => {
    
    const api = `${server}/api-v1/result/new`;
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

// get all Stored data;
type getAllDataType = {
  _id: string;
  heading: string;
  data: string;
  user: string;
};

type getAllDataRes = {
  success: boolean;
  message: string;
  results: getAllDataType[] | undefined;
};
export const getAllData = createAsyncThunk<getAllDataRes, { user: string }>(
  "get/All",
  async (user) => {
    const api = `${server}/api-v1/result/all/${user.user}`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);

// fetch signal data
export const getSingleData = createAsyncThunk<
  { success: boolean; message: string; result: getAllDataType | undefined },
  string
>("get/singleData", async (id) => {
  const api = `${server}/api-v1/result/${id}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

type initialStateYpe = {
  loading: boolean;
  result: string | undefined;
  showResult: boolean;
  error: string | undefined;
  data: storeResultRes | undefined;
  allData: getAllDataRes | undefined;
  oneData:
    | {
        success: boolean;
        message: string;
        result: getAllDataType | undefined;
      }
    | undefined;
};

const initialState: initialStateYpe = {
  loading: false,
  result: undefined,
  data: undefined,
  showResult: false,
  error: undefined,
  allData: undefined,
  oneData: undefined,
};
const geminiSlice = createSlice({
  name: "geminiSlice",
  reducers: {
    getResult: (state) => {
      state.loading = true;
      let responseString = state.result
        ?.replace(/\*\*(.*?)\*\*/g, '<br><span class="heading">$1</span><br>')
        .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
        .replace(/\*/g, "<br>");

      state.result = responseString;

      state.showResult = true;
      state.loading = false;
    },
  },
  initialState,

  extraReducers: (builder) => {
    // get data from the gemini api
    builder.addCase(fetchGeminiResult.pending, (state) => {
      state.loading = true;
      state.result = undefined;
      state.error = undefined;
    }),
      builder.addCase(fetchGeminiResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload.result;
        state.error = undefined;
      });
    builder.addCase(fetchGeminiResult.rejected, (state, action) => {
      state.loading = false;
      state.result = undefined;
      state.error = action.error.message || "any error occured";
    });

    // store data

    builder.addCase(storeResult.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    }),
      builder.addCase(storeResult.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      });
    builder.addCase(storeResult.rejected, (state, action) => {
      state.loading = false;
      state.result = undefined;
      state.error = action.error.message || "any error occured";
    });

    // store data

    builder.addCase(getAllData.pending, (state) => {
      state.loading = true;
      state.allData = undefined;
      state.error = undefined;
    }),
      builder.addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.allData = action.payload;
        state.error = undefined;
      });
    builder.addCase(getAllData.rejected, (state, action) => {
      state.loading = false;
      state.allData = undefined;
      state.error = action.error.message || "any error occured";
    });

    // get single user

    builder.addCase(getSingleData.pending, (state) => {
      state.loading = true;
      state.oneData = undefined;
      state.error = undefined;
    }),
      builder.addCase(getSingleData.fulfilled, (state, action) => {
        state.loading = false;
        state.oneData = action.payload;
        state.error = undefined;
      });
    builder.addCase(getSingleData.rejected, (state, action) => {
      state.loading = false;
      state.oneData = undefined;
      state.error = action.error.message || "any error occured";
    });
  },
});

export default geminiSlice.reducer;
export const { getResult } = geminiSlice.actions;

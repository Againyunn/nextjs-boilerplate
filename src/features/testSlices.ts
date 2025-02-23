import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import testApi, { TestDto } from "api/testApi";

import { RootState } from "app/_redux/store";
import { StateStatus } from "features/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface TestState {
  initialized: boolean;
  testList: TestDto[];
  status: StateStatus;
  error?: string | null;
}

const initialState: TestState = {
  initialized: false,
  testList: [],
  status: StateStatus.IDLE,
};

export const thunkGetTestList = createAsyncThunk("getTestList", async () => {
  const res = await testApi.getTestList();
  return res;
});

export const thunkGetTestById = createAsyncThunk(
  "getTestById",
  async (id: string) => {
    const res = await testApi.getTestById(id);
    return res;
  }
);

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 테스트 목록 가져오기
    builder.addCase(thunkGetTestList.pending, (state) => {
      state.status = StateStatus.LOADING;
    });
    builder.addCase(
      thunkGetTestList.fulfilled,
      (state, { payload }: PayloadAction<TestDto[]>) => {
        state.status = StateStatus.SUCCESS;
        state.testList = payload;
      }
    );
    builder.addCase(thunkGetTestList.rejected, (state, action) => {
      state.status = StateStatus.FAILED;
      state.testList = [];
      state.error = action.error.message;
    });

    // 특정 테스트 목록 호출
    builder.addCase(thunkGetTestById.pending, (state) => {
      state.status = StateStatus.LOADING;
    });
    builder.addCase(
      thunkGetTestById.fulfilled,
      (state, { payload }: PayloadAction<TestDto>) => {
        state.status = StateStatus.SUCCESS;

        const index = state.testList.findIndex(
          (item) => item.id === payload.id
        );

        if (index !== -1) {
          state.testList[index] = payload;
        } else {
          state.testList = [...state.testList, payload];
        }
      }
    );
    builder.addCase(thunkGetTestById.rejected, (state, action) => {
      state.status = StateStatus.FAILED;
      state.error = action.error.message;
    });
  },
});

export const selectTestList = (state: RootState) => state.test.testList;
export const selectTestStatus = (state: RootState) => state.test.status;
export const selectTestError = (state: RootState) => state.test.error;

export default testSlice.reducer;

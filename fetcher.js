var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchTimelineData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("events.json");
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = yield response.json();
            return data.timelineData;
        }
        catch (error) {
            console.error("Error loading timeline data:", error);
            return [
                {
                    year: 1977,
                    title: "Data Loading Issue",
                    summary: "Enable CORS or use a dev server to load full timeline data",
                    fullContent: "<p>Please check your console for errors and ensure:</p><ul><li>You're using a dev server (like Live Server)</li><li>events.json exists in the same folder</li></ul>"
                }
            ];
        }
    });
}
